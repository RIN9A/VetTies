package com.VetTies.DTOs;

import com.VetTies.model.User;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

public class PetDto {
    private UUID id;
    private String name;
    private String species;
    private String breed;
    private LocalDate dateOfBirth;
    private char gender;
    private double weight;
    private LocalDateTime createdAt;
    private UserDto owner;

    public UUID getId() {
        return id;
    }

    public PetDto setId(UUID id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return name;
    }

    public PetDto setName(String name) {
        this.name = name;
        return this;

    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public PetDto setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public String getSpecies() {
        return species;
    }

    public PetDto setSpecies(String species) {
        this.species = species;
        return this;

    }

    public String getBreed() {
        return breed;
    }

    public PetDto setBreed(String breed) {
        this.breed = breed;
        return this;

    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public PetDto setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
        return this;

    }

    public char getGender() {
        return gender;
    }

    public PetDto setGender(char gender) {
        this.gender = gender;
        return this;
    }

    public double getWeight() {
        return weight;
    }

    public PetDto setWeight(double weight) {
        this.weight = weight;
        return this;
    }

    public UserDto getOwner() {
        return owner;
    }

    public PetDto setOwner(UserDto owner) {
        this.owner = owner;
        return this;

    }
}
