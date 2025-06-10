package com.VetTies.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "medications")
public class Medication {
    @Id
    @GeneratedValue(generator = "UUID")
    @Column(name = "medication_id",nullable = false)
    private UUID medicationId;
    @Column(nullable = false)
    private String name;
    @ManyToOne
    @JoinColumn(name = "type_id")
    private MedicationType type;
    @Column(nullable = false)
    private int quantity;
    @Column(name = "expiry_date", nullable = false)
    private LocalDate expiryDate;
    @Column(name = "min_threshold",nullable = false)
    private int minThreshold;
    @Column(updatable = false, name = "created_at")
    @CreationTimestamp
    private LocalDateTime createdAt;
    @Column(updatable = false, name = "updated_at")
    @CreationTimestamp
    private LocalDateTime updatedAt;

    public UUID getMedicationId() {
        return medicationId;
    }

    public Medication setMedicationId(UUID medicationId) {
        this.medicationId = medicationId;
        return this;
    }

    public String getName() {
        return name;
    }

    public Medication setName(String name) {
        this.name = name;
        return this;
    }

    public MedicationType getType() {
        return type;
    }

    public Medication setType(MedicationType type) {
        this.type = type;
        return this;
    }

    public int getQuantity() {
        return quantity;
    }

    public Medication setQuantity(int quantity) {
        this.quantity = quantity;
        return this;
    }

    public LocalDate getExpiryDate() {
        return expiryDate;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public Medication setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public Medication setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
        return this;
    }

    public Medication setExpiryDate(LocalDate expiryDate) {
        this.expiryDate = expiryDate;
        return this;
    }

    public int getMinThreshold() {
        return minThreshold;
    }

    public Medication setMinThreshold(int minThreshold) {
        this.minThreshold = minThreshold;
        return this;
    }
}
