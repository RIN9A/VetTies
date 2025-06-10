package com.VetTies.service;

import com.VetTies.DTOs.OptimizationResult;
import com.VetTies.DTOs.ScheduleOptimizationRequest;
import com.VetTies.model.ScheduleSlot;
import com.VetTies.model.Vet;
import com.VetTies.repository.ScheduleSlotRepository;
import com.VetTies.repository.VetRepository;
import org.apache.commons.math3.optim.MaxIter;
import org.apache.commons.math3.optim.PointValuePair;
import org.apache.commons.math3.optim.linear.*;
import org.apache.commons.math3.optim.nonlinear.scalar.GoalType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class ScheduleOptimizerService {
    private static final int MAX_ITERATIONS = 10000;
    private static final double ASSIGNMENT_THRESHOLD = 0.5;

    @Autowired
    private VetRepository vetRepository;
    @Autowired
    private ScheduleSlotRepository slotRepository;

    public OptimizationResult optimizeSchedule(ScheduleOptimizationRequest request) {
        // 1. Получение данных
//        List<Vet> vets = vetRepository.findAll();
        List<Vet> vets = vetRepository.findAllById(request.getVetIds());
        List<ScheduleSlot> allSlots = slotRepository.findByStartTimeBetween(
                request.getStartDate().atStartOfDay(),
                request.getEndDate().atTime(LocalTime.MAX)
        );

        // Фильтруем только свободные слоты
        List<ScheduleSlot> availableSlots = allSlots.stream()
                .filter(slot -> !slot.isBooked())
                .collect(Collectors.toList());

        // 2. Проверка наличия данных
        if (availableSlots.isEmpty() || vets.isEmpty()) {
            throw new IllegalStateException("No available slots or vets for optimization");
        }
        // 3. Создание и решение задачи оптимизации
        LinearObjectiveFunction function = createObjectiveFunction(availableSlots, vets);
        LinearConstraintSet constraints = createConstraints(availableSlots, vets, request);
        SimplexSolver solver = new SimplexSolver();
        PointValuePair solution = solver.optimize(
                new MaxIter(MAX_ITERATIONS),
                function,
                constraints,
                GoalType.MINIMIZE,
                new NonNegativeConstraint(true)
        );
        // 4. Применение результатов
        return applySolution(solution, availableSlots);
    }

    private LinearObjectiveFunction createObjectiveFunction(List<ScheduleSlot> slots, List<Vet> vets) {
        // Цель: минимизировать неравномерность распределения
        double[] coefficients = new double[slots.size()];
        Arrays.fill(coefficients, 1.0);
        return new LinearObjectiveFunction(coefficients, 0);
    }

    private LinearConstraintSet createConstraints(List<ScheduleSlot> slots, List<Vet> vets,
                                                  ScheduleOptimizationRequest request) {
        List<LinearConstraint> constraints = new ArrayList<>();

        // Ограничение: не более 1 назначения на слот
        for (int i = 0; i < slots.size(); i++) {
            double[] slotCoeff = new double[slots.size()];
            slotCoeff[i] = 1;
            constraints.add(new LinearConstraint(slotCoeff, Relationship.LEQ, 1));
        }

        // Ограничение: максимальное количество приемов на врача
        for (Vet vet : vets) {
            double[] vetCoeff = new double[slots.size()];
            for (int i = 0; i < slots.size(); i++) {
                vetCoeff[i] = slots.get(i).getVet().getId().equals(vet.getId()) ? 1 : 0;
            }
            int maxAppointments = calculateMaxAppointments(vet, request);
            constraints.add(new LinearConstraint(vetCoeff, Relationship.LEQ, maxAppointments));
        }

        return new LinearConstraintSet(constraints);
    }

    private int calculateMaxAppointments(Vet vet, ScheduleOptimizationRequest request) {
        long days = ChronoUnit.DAYS.between(request.getStartDate(), request.getEndDate()) + 1;
        return 6 * (int) days;
    }

    private OptimizationResult applySolution(PointValuePair solution, List<ScheduleSlot> slots) {
        OptimizationResult result = new OptimizationResult().setTotalSlotsConsidered(slots.size());
        double[] values = solution.getPoint();

        Map<UUID, Integer> appointmentsPerVet = new HashMap<>();
        slots.forEach(slot -> appointmentsPerVet.put(slot.getVet().getId(), 0));

        for (int i = 0; i < values.length; i++) {
            System.out.println("val = " +values[i]);
            if (values[i] > ASSIGNMENT_THRESHOLD) {
                ScheduleSlot slot = slots.get(i).setBooked(true);
                slotRepository.save(slot);
                result.addAssignedSlotId(slot.getId());
                appointmentsPerVet.merge(slot.getVet().getId(), 1, Integer::sum);
            }
        }

        result.setAppointmentsPerVet(appointmentsPerVet);
        result.setTotalSlotsAssigned(result.getAssignedSlotIds().size());
        return result;
    }
}