package com.VetTies.model;

import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.IdGeneratorType;
import org.hibernate.annotations.UuidGenerator;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "pets")
public class Pet {
    @Id
    @UuidGenerator
    @Column(name = "pet_id", updatable = false, nullable = false)
    private UUID id;
    @Column(nullable = false)
    private String name;
    @Column(name = "species", nullable = false)
    private String species;
    @Column(name = "breed")
    private String breed;
    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;
    @Column
    private double weight;
    @Column
    private char gender;
    @Column
    private LocalDateTime createdAt;
    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;

    public Pet(UUID id, String name, String species, String breed, LocalDate dateOfBirth, double weight, char gender, User owner) {
        this.id = id;
        this.name = name;
        this.species = species;
        this.breed = breed;
        this.dateOfBirth = dateOfBirth;
        this.weight = weight;
        this.gender = gender;
        this.owner = owner;
    }

    public Pet() {
    }

    public UUID getId() {
        return id;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public Pet setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public double getWeight() {
        return weight;
    }

    public Pet setWeight(double weight) {
        this.weight = weight;
        return this;
    }

    public char getGender() {
        return gender;
    }

    public Pet setGender(char gender) {
        this.gender = gender;
        return this;
    }

    public Pet setId(UUID id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return name;
    }

    public Pet setName(String name) {
        this.name = name;
        return this;

    }

    public String getSpecies() {
        return species;
    }

    public Pet setSpecies(String species) {
        this.species = species;
        return this;

    }

    public String getBreed() {
        return breed;
    }

    public Pet setBreed(String breed) {
        this.breed = breed;
        return this;

    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public Pet setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
        return this;

    }

    public User getOwner() {
        return owner;
    }

    public Pet setOwner(User owner) {
        this.owner = owner;
        return this;

    }
}
