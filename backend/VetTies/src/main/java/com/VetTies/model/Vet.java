package com.VetTies.model;

import jakarta.persistence.*;
import org.hibernate.annotations.UuidGenerator;

import java.util.UUID;

@Entity
@Table(name = "vets")
public class Vet {
    @Id
    @GeneratedValue(generator = "UUID")
    @UuidGenerator
    @Column(name = "vet_id", updatable = false, nullable = false)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(name = "specialization", nullable = false)
    private String specialization;

    @Column
    private int experience;



    public Vet(UUID id, User user, String specialization, int experience) {
        this.id = id;
        this.user = user;
        this.specialization = specialization;
        this.experience = experience;
    }

    public Vet() {
    }

    public int getExperience() {
        return experience;
    }

    public Vet setExperience(int experience) {
        this.experience = experience;
        return this;
    }

    public UUID getId() {
        return id;
    }

    public Vet setId(UUID id) {
        this.id = id;
        return this;
    }

    public User getUser() {
        return user;
    }

    public Vet setUser(User user) {
        this.user = user;
        return this;

    }

    public String getSpecialization() {
        return specialization;
    }

    public Vet setSpecialization(String specialization) {
        this.specialization = specialization;
        return this;

    }
}
