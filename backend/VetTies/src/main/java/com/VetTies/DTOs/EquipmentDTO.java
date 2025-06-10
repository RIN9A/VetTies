package com.VetTies.DTOs;

import java.time.LocalDate;
import java.util.UUID;

public class EquipmentDTO {
    private UUID id;
    private String name;
    private String model;
    private String serialNumber;
    private LocalDate purchaseDate;
    private String location;
    private String manufacturer;
    private String status;

    public UUID getId() {
        return id;
    }

    public EquipmentDTO setId(UUID id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return name;
    }

    public EquipmentDTO setName(String name) {
        this.name = name;
        return this;
    }

    public String getModel() {
        return model;
    }

    public EquipmentDTO setModel(String model) {
        this.model = model;
        return this;
    }

    public String getSerialNumber() {
        return serialNumber;
    }

    public EquipmentDTO setSerialNumber(String serialNumber) {
        this.serialNumber = serialNumber;
        return this;
    }

    public LocalDate getPurchaseDate() {
        return purchaseDate;
    }

    public EquipmentDTO setPurchaseDate(LocalDate purchaseDate) {
        this.purchaseDate = purchaseDate;
        return this;
    }

    public String getLocation() {
        return location;
    }

    public EquipmentDTO setLocation(String location) {
        this.location = location;
        return this;
    }

    public String getManufacturer() {
        return manufacturer;
    }

    public EquipmentDTO setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
        return this;
    }

    public String getStatus() {
        return status;
    }

    public EquipmentDTO setStatus(String status) {
        this.status = status;
        return this;
    }
}
