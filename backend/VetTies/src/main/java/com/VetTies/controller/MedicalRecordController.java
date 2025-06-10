package com.VetTies.controller;

import com.VetTies.DTOs.MedicalRecordDto;
import com.VetTies.service.MedicalRecordService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/records")
public class MedicalRecordController {
    private final MedicalRecordService medicalRecordService;

    public MedicalRecordController(MedicalRecordService medicalRecordService) {
        this.medicalRecordService = medicalRecordService;
    }

    @PostMapping
    public MedicalRecordDto create(@RequestBody MedicalRecordDto dto) {
       return medicalRecordService.createRecord(dto);
    }

    @GetMapping("/pet/{id}")
    public List<MedicalRecordDto> getByPet(@PathVariable UUID id) {
        return medicalRecordService.getRecordsByPet(id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteById(@PathVariable UUID id) {
        return ResponseEntity.ok(medicalRecordService.deleteRecord(id));
    }
}