package com.VetTies.controller;

import com.VetTies.DTOs.MedicationUsageLogDto;
import com.VetTies.service.MedicationUsageLogService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/medication-usage")
public class MedicationUsageLogController {

    private final MedicationUsageLogService medicationUsageLogService;

    public MedicationUsageLogController(MedicationUsageLogService medicationUsageLogService) {
        this.medicationUsageLogService = medicationUsageLogService;
    }

    @PostMapping("/use")
    public ResponseEntity<String> useMedication(@RequestParam UUID medicationId,
                                                @RequestParam int quantityUsed) {
        medicationUsageLogService.logUsage(medicationId, quantityUsed);
        return ResponseEntity.ok("Usage logged");
    }

    @GetMapping("/logs")
    public ResponseEntity<List<MedicationUsageLogDto>> getLogs() {
        return ResponseEntity.ok(medicationUsageLogService.getUsageLogs());
    }
}