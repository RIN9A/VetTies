package com.VetTies.controller;

import com.VetTies.DTOs.VetDto;
import com.VetTies.DTOs.WorkingHourDto;
import com.VetTies.service.VetService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RequestMapping("/vets")
@RestController
public class VetController {
    private final VetService vetService;

    public VetController(VetService vetService) {
        this.vetService = vetService;
    }

    @GetMapping
    public ResponseEntity<List<VetDto>> getAllVets() {
        return ResponseEntity.ok(vetService.getAllVets());
    }

    @GetMapping("/{id}")
    public ResponseEntity<VetDto> getVetById(@PathVariable UUID id) {
        return ResponseEntity.ok(vetService.getVetById(id));
    }

    @GetMapping("/specializations/{spec}")
    public ResponseEntity<List<VetDto>> getBySpec(@PathVariable String spec) {
        return ResponseEntity.ok(vetService.getVetsBySpec(spec));
    }


    @PostMapping
    public ResponseEntity<VetDto> createVet(@RequestBody VetDto vetDto) {
        return ResponseEntity.ok(vetService.createVet(vetDto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<VetDto> updateVet(@PathVariable UUID id, @RequestBody VetDto vetDto) {
        return ResponseEntity.ok(vetService.updateVet(id, vetDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteVet(@PathVariable UUID id) {
        vetService.deleteVet(id);
        return ResponseEntity.ok("Ветеринар успешно удален");
    }



    @GetMapping("/{id}/working-hours")
    public ResponseEntity<List<WorkingHourDto>> getWorkingHoursByVet(@PathVariable UUID id) {
        return ResponseEntity.ok(vetService.getWorkingHoursByVet(id));
    }

    @PutMapping("/working-hours")
    public ResponseEntity<WorkingHourDto> updateWorkingDay(@RequestBody WorkingHourDto workingHourDto) {
        return ResponseEntity.ok(vetService.updateWorkingDay(workingHourDto));
    }




}
