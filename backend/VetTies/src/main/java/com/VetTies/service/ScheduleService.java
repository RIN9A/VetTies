package com.VetTies.service;

import com.VetTies.DTOs.ScheduleStatistics;
import com.VetTies.model.ScheduleSlot;
import com.VetTies.model.Vet;
import com.VetTies.model.WorkingHour;
import com.VetTies.repository.AppointmentRepository;
import com.VetTies.repository.ScheduleSlotRepository;
import com.VetTies.repository.VetRepository;
import com.VetTies.repository.WorkingHourRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ScheduleService {
    @Autowired
    private VetRepository vetRepository;
    @Autowired
    private WorkingHourRepository workingHoursRepository;
    @Autowired
    private ScheduleSlotRepository slotRepository;
    @Autowired
    private AppointmentRepository appointmentRepository;

    @Transactional
    public List<ScheduleSlot> generateSchedule(LocalDate startDate, LocalDate endDate, Duration slotDuration) {
        LocalDateTime cutoff = LocalDateTime.now().minusDays(30);
//        LocalDateTime cutoff=  endDate.atTime(LocalTime.MAX).minus(startDate.atStartOfDay());

        slotRepository.deleteByEndTimeBeforeAndIsBookedFalse(cutoff);


        boolean exists = slotRepository.existsByStartTimeBetween(startDate.atStartOfDay(), endDate.atTime(LocalTime.MAX));
        if (exists) {
            slotRepository.deleteByStartTimeBetweenAndIsBookedFalse(startDate.atStartOfDay(), endDate.atTime(LocalTime.MAX));
        }

        List<Vet> vets = vetRepository.findAll();

        List<ScheduleSlot> generatedSlots = new ArrayList<>();

        for (Vet vet : vets) {
            generatedSlots.addAll(generateVetSchedule(vet, startDate, endDate, slotDuration));
        }

        return slotRepository.saveAll(generatedSlots);
    }

    private List<ScheduleSlot> generateVetSchedule(Vet vet, LocalDate startDate, LocalDate endDate, Duration slotDuration) {
        List<ScheduleSlot> slots = new ArrayList<>();
        List<WorkingHour> workingHours = workingHoursRepository.findByVet(vet);
        System.out.println(workingHours.size());

        for (LocalDate date = startDate; !date.isAfter(endDate); date = date.plusDays(1)) {
            DayOfWeek dayOfWeek = date.getDayOfWeek();

            LocalDate finalDate = date;
            workingHours.stream()
                    .filter(wh -> wh.getDayOfWeek() == dayOfWeek)
                    .forEach(wh -> {
                        LocalTime current = wh.getStartTime();
                        while (current.plus(slotDuration).isBefore(wh.getEndTime()) ||
                                current.plus(slotDuration).equals(wh.getEndTime())) {

                            ScheduleSlot slot = new ScheduleSlot();
                            slot.setVet(vet);

                            slot.setStartTime(LocalDateTime.of(finalDate, current));
                            slot.setEndTime(LocalDateTime.of(finalDate, current.plus(slotDuration)));
                            slot.setBooked(false);
                            slots.add(slot);
                            current = current.plus(slotDuration);
                        }
                    });
        }

        return slots;
    }

    public List<ScheduleSlot> getSlotsFiltered(UUID vetId) {
        return slotRepository.findByVetIdAndIsBookedFalse(vetId);
    }

    public ScheduleStatistics calculateStatistics(LocalDate start, LocalDate end) {
        List<Vet> vets = vetRepository.findAll();
        List<ScheduleSlot> slots = slotRepository.findByStartTimeBetween(
                start.atStartOfDay(), end.atTime(LocalTime.MAX));

        Map<UUID, Long> perVet = slots.stream()
                .collect(Collectors.groupingBy(s -> s.getVet().getId(), Collectors.counting()));

        Map<String, Long> perSpecialization = slots.stream()
                .collect(Collectors.groupingBy(s -> s.getVet().getSpecialization(), Collectors.counting()));

        return new ScheduleStatistics(perVet, perSpecialization, slots.size());
    }
    public boolean isSlotAvailable(UUID vetId, LocalDateTime start, LocalDateTime end) {
        // 1. Проверка на валидность временного интервала
        if (start.isAfter(end)) {
            throw new IllegalArgumentException("Start time must be before end time");
        }

        // 2. Проверка на минимальную продолжительность слота (30 минут)
        Duration duration = Duration.between(start, end);
        if (duration.toMinutes() < 30) {
            throw new IllegalArgumentException("Slot duration must be at least 30 minutes");
        }

        // 3. Проверка доступности слота с учетом:
        // - Конкретного врача
        // - Не забронированных слотов
        // - Полного вхождения запрашиваемого интервала в существующий слот
        long availableSlots = slotRepository.countAvailableSlotsForInterval(
                vetId,
                start,
                end
        );

        // 4. Дополнительная проверка на максимальное количество приемов у врача
        Vet vet = vetRepository.findById(vetId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Vet not found with id: " + vetId));

        long existingAppointments = appointmentRepository.countByVetAndDateRange(
                vetId,
                start.toLocalDate().atStartOfDay(),
                start.toLocalDate().atTime(LocalTime.MAX)
        );

//        return availableSlots > 0 && existingAppointments < vet.getMaxDailyAppointments();
        return availableSlots > 0 && existingAppointments < 6;

    }

    @Transactional
    public ScheduleSlot moveSlot(UUID slotId, LocalDateTime newStartTime) {
        ScheduleSlot slot = slotRepository.findById(slotId)
                .orElseThrow(() -> new IllegalArgumentException("Slot not found"));

        Duration duration = Duration.between(slot.getStartTime(), slot.getEndTime());
        LocalDateTime newEndTime = newStartTime.plus(duration);

        // Проверка на пересечения
        boolean conflict = slotRepository.existsByVetAndStartTimeBetween(
                slot.getVet(), newStartTime, newEndTime.minusSeconds(1));

        if (conflict) throw new IllegalStateException("Time conflict with another slot");

        slot.setStartTime(newStartTime);
        slot.setEndTime(newEndTime);
        return slotRepository.save(slot);
    }
}
