package com.VetTies.model;
import jakarta.persistence.*;
import org.hibernate.annotations.UuidGenerator;

import java.time.LocalDate;
import java.util.UUID;


@Entity
@Table(name = "equipment_log")
public class EquipmentLog {
    @Id
    @UuidGenerator
    private UUID logId;

    @Column(name = "equipment_name")
    private String equipmentName;

    @Column(name = "maintenance_date")
    private LocalDate maintenanceDate;

    private String notes;

    public UUID getLogId() {
        return logId;
    }

    public EquipmentLog setLogId(UUID logId) {
        this.logId = logId;
        return this;
    }

    public String getEquipmentName() {
        return equipmentName;
    }

    public EquipmentLog setEquipmentName(String equipmentName) {
        this.equipmentName = equipmentName;
        return this;
    }

    public LocalDate getMaintenanceDate() {
        return maintenanceDate;
    }

    public EquipmentLog setMaintenanceDate(LocalDate maintenanceDate) {
        this.maintenanceDate = maintenanceDate;
        return this;
    }

    public String getNotes() {
        return notes;
    }

    public EquipmentLog setNotes(String notes) {
        this.notes = notes;
        return this;
    }
}