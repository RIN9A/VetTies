package com.VetTies.model;

import jakarta.persistence.*;
import org.hibernate.annotations.UuidGenerator;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "maintenance_schedule")
public class MaintenanceSchedule {
    @Id
    @UuidGenerator
    private UUID id;
    @ManyToOne
    @JoinColumn(name = "equipment_id")
    private Equipment equipment;
    private String maintenanceType;
    private Integer intervalDays;
    private LocalDate lastMaintenanceDate;
    private LocalDate nextMaintenanceDate;
    private String instructions;

    public UUID getId() {
        return id;
    }

    public MaintenanceSchedule setId(UUID id) {
        this.id = id;
        return this;
    }

    public Equipment getEquipment() {
        return equipment;
    }

    public MaintenanceSchedule setEquipment(Equipment equipment) {
        this.equipment = equipment;
        return this;
    }

    public String getMaintenanceType() {
        return maintenanceType;
    }

    public MaintenanceSchedule setMaintenanceType(String maintenanceType) {
        this.maintenanceType = maintenanceType;
        return this;
    }

    public Integer getIntervalDays() {
        return intervalDays;
    }

    public MaintenanceSchedule setIntervalDays(Integer intervalDays) {
        this.intervalDays = intervalDays;
        return this;
    }

    public LocalDate getLastMaintenanceDate() {
        return lastMaintenanceDate;
    }

    public MaintenanceSchedule setLastMaintenanceDate(LocalDate lastMaintenanceDate) {
        this.lastMaintenanceDate = lastMaintenanceDate;
        return this;
    }

    public LocalDate getNextMaintenanceDate() {
        return nextMaintenanceDate;
    }

    public MaintenanceSchedule setNextMaintenanceDate(LocalDate nextMaintenanceDate) {
        this.nextMaintenanceDate = nextMaintenanceDate;
        return this;
    }

    public String getInstructions() {
        return instructions;
    }

    public MaintenanceSchedule setInstructions(String instructions) {
        this.instructions = instructions;
        return this;
    }
}