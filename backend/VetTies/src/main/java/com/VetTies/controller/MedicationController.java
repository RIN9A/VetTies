package com.VetTies.controller;

import com.VetTies.DTOs.MedicationDto;
import com.VetTies.model.MedicationType;
import com.VetTies.service.MedicationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/medications")
public class MedicationController {
    private final MedicationService medicationService;

    public MedicationController(MedicationService medicationService) {
        this.medicationService = medicationService;
    }

    @GetMapping
    public ResponseEntity<List<MedicationDto>> getAll() {
        return ResponseEntity.ok(medicationService.getAllMedications());
    }

    @GetMapping("/types")
    public ResponseEntity<List<MedicationType>> getAllType() {
        return ResponseEntity.ok(medicationService.getAllMedType());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MedicationDto> getMedicationById(@PathVariable UUID id) {
        return ResponseEntity.ok(medicationService.getMedicationById(id));
    }
    @PostMapping
    public ResponseEntity<MedicationDto> createMedication(@RequestBody MedicationDto medicationDto) {
        return ResponseEntity.ok(medicationService.createMedication(medicationDto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<MedicationDto> updateMedication(@PathVariable UUID id, @RequestBody MedicationDto medicationDto) {
        return ResponseEntity.ok(medicationService.updateMedication(id, medicationDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMedication(@PathVariable UUID id) {
        medicationService.deleteMedication(id);
        return ResponseEntity.ok("Препарат успешно удален");
    }

    @PostMapping("/use")
    public void use(@RequestParam UUID id, @RequestParam int quantity) {
        medicationService.useMedication(id, quantity);
    }

    @GetMapping("/expiring")
    public List<MedicationDto> getExpiring() {
        return medicationService.getExpiringMedications();
    }
}