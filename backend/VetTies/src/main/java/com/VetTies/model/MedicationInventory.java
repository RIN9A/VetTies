package com.VetTies.model;
import jakarta.persistence.*;
import org.hibernate.annotations.UuidGenerator;

import java.time.LocalDateTime;
import java.util.UUID;


@Entity
@Table(name = "medication_inventory")
public class MedicationInventory {
    @Id
    @UuidGenerator
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "medication_id")
    private Medication medication;

    private Integer currentStock;
    private Integer reorderThreshold;
    private Boolean autoOrder;
    private LocalDateTime lastChecked;


    public Medication getMedication() {
        return medication;
    }

    public UUID getId() {
        return id;
    }

    public MedicationInventory setId(UUID id) {
        this.id = id;
        return this;
    }

    public MedicationInventory setMedication(Medication medication) {
        this.medication = medication;
        return this;
    }

    public Integer getCurrentStock() {
        return currentStock;
    }

    public MedicationInventory setCurrentStock(Integer currentStock) {
        this.currentStock = currentStock;
        return this;
    }

    public Integer getReorderThreshold() {
        return reorderThreshold;
    }

    public MedicationInventory setReorderThreshold(Integer reorderThreshold) {
        this.reorderThreshold = reorderThreshold;
        return this;
    }

    public Boolean getAutoOrder() {
        return autoOrder;
    }

    public MedicationInventory setAutoOrder(Boolean autoOrder) {
        this.autoOrder = autoOrder;
        return this;
    }

    public LocalDateTime getLastChecked() {
        return lastChecked;
    }

    public MedicationInventory setLastChecked(LocalDateTime lastChecked) {
        this.lastChecked = lastChecked;
        return this;
    }
}