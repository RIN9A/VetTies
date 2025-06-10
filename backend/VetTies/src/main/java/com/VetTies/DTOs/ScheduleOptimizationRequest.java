package com.VetTies.DTOs;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public class ScheduleOptimizationRequest {
    private LocalDate startDate;
    private LocalDate endDate;
    private List<UUID> vetIds;
    private boolean considerPreferences;
    private boolean preventOverwork;

    public LocalDate getStartDate() {
        return startDate;
    }

    public ScheduleOptimizationRequest setStartDate(LocalDate startDate) {
        this.startDate = startDate;
        return this;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public ScheduleOptimizationRequest setEndDate(LocalDate endDate) {
        this.endDate = endDate;
        return this;
    }

    public List<UUID> getVetIds() {
        return vetIds;
    }

    public ScheduleOptimizationRequest setVetIds(List<UUID> vetIds) {
        this.vetIds = vetIds;
        return this;
    }

    public boolean isConsiderPreferences() {
        return considerPreferences;
    }

    public ScheduleOptimizationRequest setConsiderPreferences(boolean considerPreferences) {
        this.considerPreferences = considerPreferences;
        return this;
    }

    public boolean isPreventOverwork() {
        return preventOverwork;
    }

    public ScheduleOptimizationRequest setPreventOverwork(boolean preventOverwork) {
        this.preventOverwork = preventOverwork;
        return this;
    }
}
