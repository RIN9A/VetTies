package com.VetTies.DTOs;

import java.time.LocalDateTime;
import java.util.UUID;

public class AppointmentDto {
    private UUID id;
    private String name;
    private PetDto petDto;
    private VetDto vetDto;
    private LocalDateTime appointmentTime;
    private String status;

    public UUID getId() {
        return id;
    }

    public AppointmentDto setId(UUID id) {
        this.id = id;
        return this;
    }



    public PetDto getPetDto() {
        return petDto;
    }

    public AppointmentDto setPetDto(PetDto petDto) {
        this.petDto = petDto;
        return this;
    }


    public String getName() {
        return name;
    }

    public AppointmentDto setName(String name) {
        this.name = name;
        return this;
    }

    public VetDto getVetDto() {
        return vetDto;
    }

    public AppointmentDto setVetDto(VetDto vetDto) {
        this.vetDto = vetDto;
        return this;
    }

    public LocalDateTime getAppointmentTime() {
        return appointmentTime;
    }

    public AppointmentDto setAppointmentTime(LocalDateTime appointmentTime) {
        this.appointmentTime = appointmentTime;
        return this;
    }

    public String getStatus() {
        return status;
    }

    public AppointmentDto setStatus(String status) {
        this.status = status;
        return this;
    }
}
