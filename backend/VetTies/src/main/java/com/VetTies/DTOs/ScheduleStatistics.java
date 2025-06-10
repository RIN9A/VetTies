package com.VetTies.DTOs;

import java.util.Map;
import java.util.UUID;

public class ScheduleStatistics {
    private Map<UUID, Long> appointmentsPerVet;
    private Map<String, Long> appointmentsPerSpecialization;
    private int totalSlots;

    public ScheduleStatistics(Map<UUID, Long> appointmentsPerVet,
                              Map<String, Long> appointmentsPerSpecialization,
                              int totalSlots) {
        this.appointmentsPerVet = appointmentsPerVet;
        this.appointmentsPerSpecialization = appointmentsPerSpecialization;
        this.totalSlots = totalSlots;
    }

    public Map<UUID, Long> getAppointmentsPerVet() {
        return appointmentsPerVet;
    }

    public ScheduleStatistics setAppointmentsPerVet(Map<UUID, Long> appointmentsPerVet) {
        this.appointmentsPerVet = appointmentsPerVet;
        return this;
    }

    public Map<String, Long> getAppointmentsPerSpecialization() {
        return appointmentsPerSpecialization;
    }

    public ScheduleStatistics setAppointmentsPerSpecialization(Map<String, Long> appointmentsPerSpecialization) {
        this.appointmentsPerSpecialization = appointmentsPerSpecialization;
        return this;
    }

    public int getTotalSlots() {
        return totalSlots;
    }

    public ScheduleStatistics setTotalSlots(int totalSlots) {
        this.totalSlots = totalSlots;
        return this;
    }
}