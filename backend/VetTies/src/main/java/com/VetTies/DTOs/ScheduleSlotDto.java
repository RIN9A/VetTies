package com.VetTies.DTOs;

import java.time.LocalDateTime;
import java.util.UUID;

public class ScheduleSlotDto {
    private UUID vetId;
    private String vetName;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String appointmentType;
    private double workloadScore; // 0-1 fuzzy score

    public UUID getVetId() {
        return vetId;
    }

    public ScheduleSlotDto setVetId(UUID vetId) {
        this.vetId = vetId;
        return this;
    }

    public String getVetName() {
        return vetName;
    }

    public ScheduleSlotDto setVetName(String vetName) {
        this.vetName = vetName;
        return this;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public ScheduleSlotDto setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
        return this;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public ScheduleSlotDto setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
        return this;
    }

    public String getAppointmentType() {
        return appointmentType;
    }

    public ScheduleSlotDto setAppointmentType(String appointmentType) {
        this.appointmentType = appointmentType;
        return this;
    }

    public double getWorkloadScore() {
        return workloadScore;
    }

    public ScheduleSlotDto setWorkloadScore(double workloadScore) {
        this.workloadScore = workloadScore;
        return this;
    }
}