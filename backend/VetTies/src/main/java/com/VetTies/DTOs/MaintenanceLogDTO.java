package com.VetTies.DTOs;

import java.time.LocalDate;
import java.util.UUID;

public class MaintenanceLogDTO {
    private UUID id;
    private UUID equipmentId;
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

    public MaintenanceLogDTO setId(UUID id) {
        this.id = id;
        return this;
    }

    public UUID getEquipmentId() {
        return equipmentId;
    }

    public MaintenanceLogDTO setEquipmentId(UUID equipmentId) {
        this.equipmentId = equipmentId;
        return this;
    }

    public LocalDate getMaintenanceDate() {
        return maintenanceDate;
    }

    public MaintenanceLogDTO setMaintenanceDate(LocalDate maintenanceDate) {
        this.maintenanceDate = maintenanceDate;
        return this;
    }

    public String getMaintenanceType() {
        return maintenanceType;
    }

    public MaintenanceLogDTO setMaintenanceType(String maintenanceType) {
        this.maintenanceType = maintenanceType;
        return this;
    }

    public String getPerformedBy() {
        return performedBy;
    }

    public MaintenanceLogDTO setPerformedBy(String performedBy) {
        this.performedBy = performedBy;
        return this;
    }

    public String getDescription() {
        return description;
    }

    public MaintenanceLogDTO setDescription(String description) {
        this.description = description;
        return this;
    }

    public String getPartsReplaced() {
        return partsReplaced;
    }

    public MaintenanceLogDTO setPartsReplaced(String partsReplaced) {
        this.partsReplaced = partsReplaced;
        return this;
    }

    public Double getCost() {
        return cost;
    }

    public MaintenanceLogDTO setCost(Double cost) {
        this.cost = cost;
        return this;
    }

    public LocalDate getNextMaintenanceDate() {
        return nextMaintenanceDate;
    }

    public MaintenanceLogDTO setNextMaintenanceDate(LocalDate nextMaintenanceDate) {
        this.nextMaintenanceDate = nextMaintenanceDate;
        return this;
    }
}