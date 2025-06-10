package com.VetTies.controller;

import com.VetTies.DTOs.EquipmentDTO;
import com.VetTies.model.Equipment;
import com.VetTies.service.EquipmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/equipment")
public class EquipmentController {
    private final EquipmentService equipmentService;

    public EquipmentController(EquipmentService equipmentService) {
        this.equipmentService = equipmentService;
    }

    @GetMapping
    public ResponseEntity<List<EquipmentDTO>> getAllEquipment() {
        List<EquipmentDTO> equipment = equipmentService.getAllEquipment().stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
        return ResponseEntity.ok(equipment);
    }
    
    @PostMapping
    public ResponseEntity<EquipmentDTO> addEquipment(@RequestBody EquipmentDTO equipmentDTO) {
        Equipment equipment = equipmentService.addEquipment(equipmentDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(convertToDTO(equipment));
    }
    @GetMapping("/{id}")
    public ResponseEntity<EquipmentDTO> updateEquipment(
            @PathVariable UUID id) {
        Equipment equipment = equipmentService.getEquipmentById(id);
        return ResponseEntity.ok(convertToDTO(equipment));
    }
    @PutMapping("/{id}")
    public ResponseEntity<EquipmentDTO> updateEquipment(
            @PathVariable UUID id,
            @RequestBody EquipmentDTO equipmentDTO) {
        Equipment equipment = equipmentService.updateEquipment(id, equipmentDTO);
        return ResponseEntity.ok(convertToDTO(equipment));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEquipment(@PathVariable UUID id) {
        equipmentService.deleteEquipment(id);
        return ResponseEntity.noContent().build();
    }
    
    private EquipmentDTO convertToDTO(Equipment equipment) {
        return new EquipmentDTO()
                .setId(equipment.getId())
                .setName(equipment.getName())
                .setLocation(equipment.getLocation())
                .setManufacturer(equipment.getManufacturer())
                .setStatus(equipment.getStatus())
                .setModel(equipment.getModel())
                .setPurchaseDate(equipment.getPurchaseDate())
                .setSerialNumber(equipment.getSerialNumber());

    }
}