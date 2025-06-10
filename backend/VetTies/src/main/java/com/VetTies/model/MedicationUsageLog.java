package com.VetTies.model;

import jakarta.persistence.*;
import org.hibernate.annotations.UuidGenerator;

import java.time.LocalDate;
import java.util.UUID;


@Entity
@Table(name="medication_usage_log")
public class MedicationUsageLog {
    @Id
    @UuidGenerator
    private UUID logId;

    @ManyToOne
    @JoinColumn(name = "medication_id")
    private Medication medication;

    @Column(name = "quantity_used")
    private Integer quantityUsed;

    @Column(name = "used_at")
    private LocalDate usedAt;

    public UUID getLogId() {
        return logId;
    }

    public MedicationUsageLog setLogId(UUID logId) {
        this.logId = logId;
        return this;
    }

    public Medication getMedication() {
        return medication;
    }

    public MedicationUsageLog setMedication(Medication medication) {
        this.medication = medication;
        return this;
    }

    public Integer getQuantityUsed() {
        return quantityUsed;
    }

    public MedicationUsageLog setQuantityUsed(Integer quantityUsed) {
        this.quantityUsed = quantityUsed;
        return this;
    }

    public LocalDate getUsedAt() {
        return usedAt;
    }

    public MedicationUsageLog setUsedAt(LocalDate usedAt) {
        this.usedAt = usedAt;
        return this;
    }
}
