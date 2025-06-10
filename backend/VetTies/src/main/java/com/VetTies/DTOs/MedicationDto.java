package com.VetTies.DTOs;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

public class MedicationDto {
    private UUID medicationId;
    private String name;
    private UUID typeId;
    private String typeName;
    private Integer quantity;
    private LocalDate expiryDate;
    private Integer minThreshold;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public UUID getMedicationId() {
        return medicationId;
    }

    public MedicationDto setMedicationId(UUID medicationId) {
        this.medicationId = medicationId;
        return this;
    }

    public String getTypeName() {
        return typeName;
    }

    public MedicationDto setTypeName(String typeName) {
        this.typeName = typeName;
        return this;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public MedicationDto setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public MedicationDto setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
        return this;
    }

    public String getName() {
        return name;
    }

    public MedicationDto setName(String name) {
        this.name = name;
        return this;
    }

    public UUID getTypeId() {
        return typeId;
    }

    public MedicationDto setTypeId(UUID typeId) {
        this.typeId = typeId;
        return this;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public MedicationDto setQuantity(Integer quantity) {
        this.quantity = quantity;
        return this;
    }

    public LocalDate getExpiryDate() {
        return expiryDate;
    }

    public MedicationDto setExpiryDate(LocalDate expiryDate) {
        this.expiryDate = expiryDate;
        return this;
    }

    public Integer getMinThreshold() {
        return minThreshold;
    }

    public MedicationDto setMinThreshold(Integer minThreshold) {
        this.minThreshold = minThreshold;
        return this;
    }
}