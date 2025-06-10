package com.VetTies.DTOs;

import java.time.LocalDate;
import java.util.UUID;

public class MaintenanceScheduleDTO {
    private UUID id;
    private UUID equipmentId;
    private String maintenanceType;
    private Integer intervalDays;
    private LocalDate lastMaintenanceDate;
    private LocalDate nextMaintenanceDate;
    private String instructions;

    public UUID getId() {
        return id;
    }

    public MaintenanceScheduleDTO setId(UUID id) {
        this.id = id;
        return this;
    }

    public UUID getEquipmentId() {
        return equipmentId;
    }

    public MaintenanceScheduleDTO setEquipmentId(UUID equipmentId) {
        this.equipmentId = equipmentId;
        return this;
    }

    public String getMaintenanceType() {
        return maintenanceType;
    }

    public MaintenanceScheduleDTO setMaintenanceType(String maintenanceType) {
        this.maintenanceType = maintenanceType;
        return this;
    }

    public Integer getIntervalDays() {
        return intervalDays;
    }

    public MaintenanceScheduleDTO setIntervalDays(Integer intervalDays) {
        this.intervalDays = intervalDays;
        return this;
    }

    public LocalDate getLastMaintenanceDate() {
        return lastMaintenanceDate;
    }

    public MaintenanceScheduleDTO setLastMaintenanceDate(LocalDate lastMaintenanceDate) {
        this.lastMaintenanceDate = lastMaintenanceDate;
        return this;
    }

    public LocalDate getNextMaintenanceDate() {
        return nextMaintenanceDate;
    }

    public MaintenanceScheduleDTO setNextMaintenanceDate(LocalDate nextMaintenanceDate) {
        this.nextMaintenanceDate = nextMaintenanceDate;
        return this;
    }

    public String getInstructions() {
        return instructions;
    }

    public MaintenanceScheduleDTO setInstructions(String instructions) {
        this.instructions = instructions;
        return this;
    }
}
