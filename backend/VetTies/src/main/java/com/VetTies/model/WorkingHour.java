package com.VetTies.model;

import jakarta.persistence.*;
import org.hibernate.annotations.UuidGenerator;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.UUID;

@Entity
@Table(name="working_hours")
public class WorkingHour {
    @Id
    @UuidGenerator
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "vet_id")
    private Vet vet;

    @Enumerated(EnumType.STRING)
    @Column(name = "day_of_week")
    private DayOfWeek dayOfWeek;

    @Column(name = "start_time")
    private LocalTime startTime;

    @Column(name = "end_time")
    private LocalTime endTime;

    public UUID getId() {
        return id;
    }

    public WorkingHour setId(UUID id) {
        this.id = id;
        return this;
    }

    public Vet getVet() {
        return vet;
    }

    public WorkingHour setVet(Vet vet) {
        this.vet = vet;
        return this;
    }

    public DayOfWeek getDayOfWeek() {
        return dayOfWeek;
    }

    public WorkingHour setDayOfWeek(DayOfWeek dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
        return this;
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public WorkingHour setStartTime(LocalTime startTime) {
        this.startTime = startTime;
        return this;
    }

    public LocalTime getEndTime() {
        return endTime;
    }

    public WorkingHour setEndTime(LocalTime endTime) {
        this.endTime = endTime;
        return this;
    }
}