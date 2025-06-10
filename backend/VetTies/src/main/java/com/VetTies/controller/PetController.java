package com.VetTies.controller;

import com.VetTies.DTOs.PetDto;
import com.VetTies.service.PetService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RequestMapping("/pets")
@RestController
public class PetController {
    private final PetService petService;

    public PetController(PetService petService) {
        this.petService = petService;
    }

    @GetMapping
    public ResponseEntity<List<PetDto>> getAllPets() {
        return ResponseEntity.ok(petService.getAllPets());
    }
    @GetMapping("/{id}")
    public ResponseEntity<PetDto> getPetById(@PathVariable UUID id) {
        return ResponseEntity.ok(petService.getPetById(id));
    }
    @GetMapping("/owners/{id}")
    public ResponseEntity<List<PetDto>> getPetsByOwner(@PathVariable UUID id) {
        return ResponseEntity.ok(petService.getPetsByOwner(id));
    }
    @PostMapping
    public ResponseEntity<PetDto> createPet(@RequestBody PetDto petDto) {
        return ResponseEntity.ok(petService.createPet(petDto));
    }
    @PutMapping("/{id}")
    public ResponseEntity<PetDto> updatePet(@PathVariable UUID id, @RequestBody PetDto petDto) {
        return ResponseEntity.ok(petService.updatePet(id, petDto));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePet(@PathVariable UUID id) {
        petService.deletePet(id);
        return ResponseEntity.ok("Питомец успешно удален");
    }
 }
