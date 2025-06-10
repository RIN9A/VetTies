package com.VetTies.model;

import jakarta.persistence.*;
import org.hibernate.annotations.UuidGenerator;


import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "schedule_slots")
public class ScheduleSlot {
    @Id
    @UuidGenerator
    private UUID id;
    @ManyToOne
    private Vet vet;

    private LocalDateTime startTime;
    private LocalDateTime endTime;

    private boolean isBooked = false;

    public UUID getId() {
        return id;
    }

    public ScheduleSlot setId(UUID id) {
        this.id = id;
        return this;
    }

    public Vet getVet() {
        return vet;
    }

    public ScheduleSlot setVet(Vet vet) {
        this.vet = vet;
        return this;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public ScheduleSlot setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
        return this;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public ScheduleSlot setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
        return this;
    }

    public boolean isBooked() {
        return isBooked;
    }

    public ScheduleSlot setBooked(boolean booked) {
        isBooked = booked;
        return this;
    }
}