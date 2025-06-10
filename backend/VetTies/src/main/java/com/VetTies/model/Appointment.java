package com.VetTies.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UuidGenerator;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "appointments")
public class Appointment {
    @Id
    @UuidGenerator
    @Column(name="appointment_id")
    private UUID appointmentId;
    @Column
    private String name;
    @ManyToOne
    @JoinColumn(name = "pet_id", nullable = false)
    private Pet pet;
    @ManyToOne
    @JoinColumn(name = "vet_id")
    private Vet vet;
    @Column(nullable = false, name = "appointment_time")
    private LocalDateTime appointmentTime;
    @ManyToOne
    @JoinColumn(name = "status_id")
    private AppointmentStatus status;
    @Column(updatable = false, name = "created_at")
    @CreationTimestamp
    private LocalDateTime createdAt;

    @OneToOne
    private ScheduleSlot slot;

    public Appointment() {
    }

    public Appointment(UUID appointmentId, String name, Pet pet, Vet vet, LocalDateTime appointmentTime, AppointmentStatus status, LocalDateTime createdAt) {
        this.appointmentId = appointmentId;
        this.name = name;
        this.pet = pet;
        this.vet = vet;
        this.appointmentTime = appointmentTime;
        this.status = status;
        this.createdAt = createdAt;
    }

    public String getName() {
        return name;
    }

    public ScheduleSlot getSlot() {
        return slot;
    }

    public Appointment setSlot(ScheduleSlot slot) {
        this.slot = slot;
        return this;
    }

    public Appointment setName(String name) {
        this.name = name;
        return this;
    }

    public UUID getAppointmentId() {
        return appointmentId;
    }

    public Appointment setAppointmentId(UUID appointmentId) {
        this.appointmentId = appointmentId;
        return this;

    }

    public Pet getPet() {
        return pet;
    }

    public Appointment setPet(Pet pet) {
        this.pet = pet;
        return this;
    }

    public Vet getVet() {
        return vet;
    }

    public Appointment setVet(Vet vet) {
        this.vet = vet;
        return this;

    }

    public LocalDateTime getAppointmentTime() {
        return appointmentTime;
    }

    public Appointment setAppointmentTime(LocalDateTime appointmentTime) {
        this.appointmentTime = appointmentTime;
        return this;

    }

    public AppointmentStatus getStatus() {
        return status;
    }

    public Appointment setStatus(AppointmentStatus status) {
        this.status = status;
        return this;

    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public Appointment setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
        return this;

    }
}
