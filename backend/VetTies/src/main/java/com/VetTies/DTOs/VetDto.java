package com.VetTies.DTOs;

import com.VetTies.model.User;

import java.util.UUID;

public class VetDto {
    private UUID id;
    private UserDto user;
    private String specialization;
    private int experience;

    public UUID getId() {
        return id;
    }

    public VetDto setId(UUID id) {
        this.id = id;
        return this;
    }


    public int getExperience() {
        return experience;
    }

    public VetDto setExperience(int experience) {
        this.experience = experience;
        return this;
    }

    public UserDto getUser() {
        return user;
    }

    public VetDto setUser(UserDto user) {
        this.user = user;
        return this;
    }

    public String getSpecialization() {
        return specialization;
    }

    public VetDto setSpecialization(String specialization) {
        this.specialization = specialization;
        return this;
    }
}
