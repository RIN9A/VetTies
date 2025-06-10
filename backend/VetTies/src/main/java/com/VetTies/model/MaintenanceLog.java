package com.VetTies.model;

import jakarta.persistence.*;
import org.hibernate.annotations.UuidGenerator;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "maintenance_log")
public class MaintenanceLog {
    @Id
    @UuidGenerator
    private UUID id;
    
    @ManyToOne
    @JoinColumn(name = "equipment_id")
    private Equipment equipment;
    
    private LocalDate maintenanceDate;
    private String maintenanceType;
    private String performedBy;
    private String description;
    private String partsReplaced;
    private Double cost;
    private LocalDate nextMaintenanceDate;

    public UUID getId() {
        return id;
    }

    public MaintenanceLog setId(UUID id) {
        this.id = id;
        return this;
    }

    public Equipment getEquipment() {
        return equipment;
    }

    public MaintenanceLog setEquipment(Equipment equipment) {
        this.equipment = equipment;
        return this;
    }

    public LocalDate getMaintenanceDate() {
        return maintenanceDate;
    }

    public MaintenanceLog setMaintenanceDate(LocalDate maintenanceDate) {
        this.maintenanceDate = maintenanceDate;
        return this;
    }

    public String getMaintenanceType() {
        return maintenanceType;
    }

    public MaintenanceLog setMaintenanceType(String maintenanceType) {
        this.maintenanceType = maintenanceType;
        return this;
    }

    public String getPerformedBy() {
        return performedBy;
    }

    public MaintenanceLog setPerformedBy(String performedBy) {
        this.performedBy = performedBy;
        return this;
    }

    public String getDescription() {
        return description;
    }

    public MaintenanceLog setDescription(String description) {
        this.description = description;
        return this;
    }

    public String getPartsReplaced() {
        return partsReplaced;
    }

    public MaintenanceLog setPartsReplaced(String partsReplaced) {
        this.partsReplaced = partsReplaced;
        return this;
    }

    public Double getCost() {
        return cost;
    }

    public MaintenanceLog setCost(Double cost) {
        this.cost = cost;
        return this;
    }

    public LocalDate getNextMaintenanceDate() {
        return nextMaintenanceDate;
    }

    public MaintenanceLog setNextMaintenanceDate(LocalDate nextMaintenanceDate) {
        this.nextMaintenanceDate = nextMaintenanceDate;
        return this;
    }

    // getters, setters, constructors
}