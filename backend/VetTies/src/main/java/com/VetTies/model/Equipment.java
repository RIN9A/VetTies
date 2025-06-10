package com.VetTies.model;

import jakarta.persistence.*;
import org.hibernate.annotations.UuidGenerator;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "equipment")
public class Equipment {
    @Id
    @UuidGenerator
    private UUID id;
    private String name;
    private String model;
    private String serialNumber;
    private LocalDate purchaseDate;
    private String location;
    private String manufacturer;
    private String status;
    @OneToMany(mappedBy = "equipment", cascade = CascadeType.ALL)
    private List<MaintenanceSchedule> schedules;
    @OneToMany(mappedBy = "equipment", cascade = CascadeType.ALL)
    private List<MaintenanceLog> logs;

    public UUID getId() {
        return id;
    }

    public Equipment setId(UUID id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return name;
    }

    public Equipment setName(String name) {
        this.name = name;
        return this;
    }

    public String getModel() {
        return model;
    }

    public Equipment setModel(String model) {
        this.model = model;
        return this;
    }

    public String getSerialNumber() {
        return serialNumber;
    }

    public Equipment setSerialNumber(String serialNumber) {
        this.serialNumber = serialNumber;
        return this;
    }

    public LocalDate getPurchaseDate() {
        return purchaseDate;
    }

    public Equipment setPurchaseDate(LocalDate purchaseDate) {
        this.purchaseDate = purchaseDate;
        return this;
    }

    public String getLocation() {
        return location;
    }

    public Equipment setLocation(String location) {
        this.location = location;
        return this;
    }

    public String getManufacturer() {
        return manufacturer;
    }

    public Equipment setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
        return this;
    }

    public String getStatus() {
        return status;
    }

    public Equipment setStatus(String status) {
        this.status = status;
        return this;
    }

    public List<MaintenanceSchedule> getSchedules() {
        return schedules;
    }

    public Equipment setSchedules(List<MaintenanceSchedule> schedules) {
        this.schedules = schedules;
        return this;
    }

    public List<MaintenanceLog> getLogs() {
        return logs;
    }

    public Equipment setLogs(List<MaintenanceLog> logs) {
        this.logs = logs;
        return this;
    }
}
