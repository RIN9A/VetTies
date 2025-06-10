package com.VetTies.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import org.hibernate.annotations.UuidGenerator;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.UUID;

@Entity
@Table(name = "vet_preference")
public class VetPreference {
    @Id
    @UuidGenerator
    private UUID vetId;
    private DayOfWeek preferredDay;
    private LocalTime preferredStartTime;
    private double preferenceWeight; // Fuzzy weight 0-1

    public UUID getVetId() {
        return vetId;
    }

    public VetPreference setVetId(UUID vetId) {
        this.vetId = vetId;
        return this;
    }

    public DayOfWeek getPreferredDay() {
        return preferredDay;
    }

    public VetPreference setPreferredDay(DayOfWeek preferredDay) {
        this.preferredDay = preferredDay;
        return this;
    }

    public LocalTime getPreferredStartTime() {
        return preferredStartTime;
    }

    public VetPreference setPreferredStartTime(LocalTime preferredStartTime) {
        this.preferredStartTime = preferredStartTime;
        return this;
    }

    public double getPreferenceWeight() {
        return preferenceWeight;
    }

    public VetPreference setPreferenceWeight(double preferenceWeight) {
        this.preferenceWeight = preferenceWeight;
        return this;
    }
}