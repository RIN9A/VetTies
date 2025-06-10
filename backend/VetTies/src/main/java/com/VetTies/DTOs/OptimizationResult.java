package com.VetTies.DTOs;

import com.VetTies.model.ScheduleSlot;

import java.time.LocalDateTime;
import java.util.*;

public class OptimizationResult {
    private LocalDateTime calculationTime = LocalDateTime.now();
    private int totalSlotsConsidered;
    private int totalSlotsAssigned;
    private double optimizationScore;
    private List<UUID> assignedSlotIds = new ArrayList<>();;
    private List<ScheduleSlot> assignedSlots = new ArrayList<>();
    private Map<UUID, Integer> appointmentsPerVet = new HashMap<>();
    private Map<String, Integer> appointmentsPerSpecialization = new HashMap<>();
    private List<Violation> constraintViolations;
    private String optimizationAlgorithm;
    private double executionTimeSeconds;
    
    // Конструкторы
    public OptimizationResult() {
        this.calculationTime = LocalDateTime.now();
        this.assignedSlotIds = new ArrayList<>();
        this.assignedSlots = new ArrayList<>();
        this.appointmentsPerVet = new HashMap<>();
        this.appointmentsPerSpecialization = new HashMap<>();
        this.constraintViolations = new ArrayList<>();
    }
    
    // Геттеры и сеттеры


    public LocalDateTime getCalculationTime() {
        return calculationTime;
    }

    public OptimizationResult setCalculationTime(LocalDateTime calculationTime) {
        this.calculationTime = calculationTime;
        return this;
    }

    public int getTotalSlotsConsidered() {
        return totalSlotsConsidered;
    }

    public OptimizationResult setTotalSlotsConsidered(int totalSlotsConsidered) {
        this.totalSlotsConsidered = totalSlotsConsidered;
        return this;
    }

    public int getTotalSlotsAssigned() {
        return totalSlotsAssigned;
    }

    public OptimizationResult setTotalSlotsAssigned(int totalSlotsAssigned) {
        this.totalSlotsAssigned = totalSlotsAssigned;
        return this;
    }

    public double getOptimizationScore() {
        return optimizationScore;
    }

    public OptimizationResult setOptimizationScore(double optimizationScore) {
        this.optimizationScore = optimizationScore;
        return this;
    }

    public List<UUID> getAssignedSlotIds() {
        return assignedSlotIds;
    }

    public List<ScheduleSlot> getAssignedSlots() {
        return assignedSlots;
    }

    public OptimizationResult setAssignedSlots(List<ScheduleSlot> assignedSlots) {
        this.assignedSlots = assignedSlots;
        return this;
    }

    public OptimizationResult setAssignedSlotIds(List<UUID> assignedSlotIds) {
        this.assignedSlotIds = assignedSlotIds;
        return this;
    }

    public OptimizationResult setAppointmentsPerVet(Map<UUID, Integer> appointmentsPerVet) {
        this.appointmentsPerVet = appointmentsPerVet;
        return this;
    }

    public OptimizationResult setConstraintViolations(List<Violation> constraintViolations) {
        this.constraintViolations = constraintViolations;
        return this;
    }

    public void addAssignedSlotId(UUID slotId) {
        this.assignedSlotIds.add(slotId);
    }

    public void addAssignedSlot(ScheduleSlot slot) {
        this.assignedSlots.add(slot);
    }


    public Map<UUID, Integer> getAppointmentsPerVet() {
        return appointmentsPerVet;
    }

    
    public void addAppointmentsForVet(UUID vetId, int count) {
        this.appointmentsPerVet.put(vetId, count);
    }
    
    public Map<String, Integer> getAppointmentsPerSpecialization() {
        return appointmentsPerSpecialization;
    }
    
    public void setAppointmentsPerSpecialization(Map<String, Integer> appointmentsPerSpecialization) {
        this.appointmentsPerSpecialization = appointmentsPerSpecialization;
    }
    
    public List<Violation> getConstraintViolations() {
        return constraintViolations;
    }
    
    public void addConstraintViolation(Violation violation) {
        this.constraintViolations.add(violation);
    }
    
    public String getOptimizationAlgorithm() {
        return optimizationAlgorithm;
    }
    
    public void setOptimizationAlgorithm(String optimizationAlgorithm) {
        this.optimizationAlgorithm = optimizationAlgorithm;
    }
    
    public double getExecutionTimeSeconds() {
        return executionTimeSeconds;
    }
    
    public void setExecutionTimeSeconds(double executionTimeSeconds) {
        this.executionTimeSeconds = executionTimeSeconds;
    }
    
    // Методы для вычисления статистики
    public double getAssignmentRate() {
        return totalSlotsConsidered > 0 ? 
                (double) totalSlotsAssigned / totalSlotsConsidered : 0;
    }
    
    public double getAverageAppointmentsPerVet() {
        return appointmentsPerVet.values().stream()
                .mapToInt(Integer::intValue)
                .average()
                .orElse(0);
    }
    
    // Вложенный класс для нарушений ограничений
    public static class Violation {
        private String constraintName;
        private String description;
        private int severity; // 1-10
        
        public Violation(String constraintName, String description, int severity) {
            this.constraintName = constraintName;
            this.description = description;
            this.severity = severity;
        }
        
        // Геттеры
        public String getConstraintName() {
            return constraintName;
        }
        
        public String getDescription() {
            return description;
        }
        
        public int getSeverity() {
            return severity;
        }
    }
}