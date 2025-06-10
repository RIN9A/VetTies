package com.VetTies.DTOs;

import java.time.LocalDate;
import java.util.UUID;

public class EquipmentLogDto {
    private UUID logId;
    private String equipmentName;
    private LocalDate maintenanceDate;
    private String notes;

    public UUID getLogId() {
        return logId;
    }

    public EquipmentLogDto setLogId(UUID logId) {
        this.logId = logId;
        return this;
    }

    public String getEquipmentName() {
        return equipmentName;
    }

    public EquipmentLogDto setEquipmentName(String equipmentName) {
        this.equipmentName = equipmentName;
        return this;
    }

    public LocalDate getMaintenanceDate() {
        return maintenanceDate;
    }

    public EquipmentLogDto setMaintenanceDate(LocalDate maintenanceDate) {
        this.maintenanceDate = maintenanceDate;
        return this;
    }

    public String getNotes() {
        return notes;
    }

    public EquipmentLogDto setNotes(String notes) {
        this.notes = notes;
        return this;
    }
}