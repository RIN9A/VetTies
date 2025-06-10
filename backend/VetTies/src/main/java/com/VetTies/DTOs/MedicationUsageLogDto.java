package com.VetTies.DTOs;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

public class MedicationUsageLogDto {
    private UUID logId;
    private UUID medicationId;
    private int quantityUsed;
    private LocalDate usedAt;

    public UUID getLogId() {
        return logId;
    }

    public MedicationUsageLogDto setLogId(UUID logId) {
        this.logId = logId;
        return this;
    }

    public UUID getMedicationId() {
        return medicationId;
    }

    public MedicationUsageLogDto setMedicationId(UUID medicationId) {
        this.medicationId = medicationId;
        return this;
    }

    public int getQuantityUsed() {
        return quantityUsed;
    }

    public MedicationUsageLogDto setQuantityUsed(int quantityUsed) {
        this.quantityUsed = quantityUsed;
        return this;
    }

    public LocalDate getUsedAt() {
        return usedAt;
    }

    public MedicationUsageLogDto setUsedAt(LocalDate usedAt) {
        this.usedAt = usedAt;
        return this;
    }
}