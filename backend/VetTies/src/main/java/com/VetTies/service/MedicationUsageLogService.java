package com.VetTies.service;

import com.VetTies.DTOs.MedicationUsageLogDto;
import com.VetTies.model.Medication;
import com.VetTies.model.MedicationUsageLog;
import com.VetTies.repository.MedicationRepository;
import com.VetTies.repository.UsageLogRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class MedicationUsageLogService {

    private final MedicationRepository medicationRepository;

    private final UsageLogRepository usageLogRepository;

    public MedicationUsageLogService(MedicationRepository medicationRepository, UsageLogRepository usageLogRepository) {
        this.medicationRepository = medicationRepository;
        this.usageLogRepository = usageLogRepository;
    }

    public void logUsage(UUID medicationId, int quantityUsed) {
        Medication medication = medicationRepository.findById(medicationId)
                .orElseThrow(() -> new RuntimeException("Medication not found"));

        medication.setQuantity(medication.getQuantity() - quantityUsed);
        medicationRepository.save(medication);

        MedicationUsageLog log = new MedicationUsageLog();
        log.setMedication(medication);
        log.setQuantityUsed(quantityUsed);
        log.setUsedAt(LocalDate.now());

        usageLogRepository.save(log);
    }

    public List<MedicationUsageLogDto> getUsageLogs() {
        return usageLogRepository.findAll().stream().map(log -> {
            MedicationUsageLogDto dto = new MedicationUsageLogDto();
            dto.setLogId(log.getLogId());
            dto.setMedicationId(log.getMedication().getMedicationId());
            dto.setQuantityUsed(log.getQuantityUsed());
            dto.setUsedAt(log.getUsedAt());
            return dto;
        }).collect(Collectors.toList());
    }
}