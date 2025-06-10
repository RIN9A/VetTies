package com.VetTies.DTOs;

import java.time.LocalTime;
import java.util.UUID;

public class WorkingHourDto {
    private UUID id;
    private String dayOfWeek;
    private LocalTime startTime;
    private LocalTime endTime;


    public UUID getId() {
        return id;
    }

    public WorkingHourDto setId(UUID id) {
        this.id = id;
        return this;
    }

    public String getDayOfWeek() {
        return dayOfWeek;
    }

    public WorkingHourDto setDayOfWeek(String dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
        return this;
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public WorkingHourDto setStartTime(LocalTime startTime) {
        this.startTime = startTime;
        return this;
    }

    public LocalTime getEndTime() {
        return endTime;
    }

    public WorkingHourDto setEndTime(LocalTime endTime) {
        this.endTime = endTime;
        return this;
    }
}
