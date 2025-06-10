package com.VetTies.service;

import com.VetTies.DTOs.EquipmentDTO;
import com.VetTies.model.Equipment;
import com.VetTies.repository.EquipmentRepository;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class EquipmentService {
    private final EquipmentRepository equipmentRepository;
    
    public EquipmentService(EquipmentRepository equipmentRepository) {
        this.equipmentRepository = equipmentRepository;
    }
    
    public Equipment addEquipment(EquipmentDTO equipmentDTO) {
        Equipment equipment = new Equipment();
        // mapping from DTO to entity
        return equipmentRepository.save(equipment);
    }
    
    public List<Equipment> getAllEquipment() {
        return equipmentRepository.findAll();
    }

    public Equipment getEquipmentById(UUID id) {
        return equipmentRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,"Equipment not found"));
    }
    
    public Equipment updateEquipment(UUID id, EquipmentDTO equipmentDTO) {
        Equipment equipment = equipmentRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Equipment not found"));
        return equipmentRepository.save(equipment);
    }
    
    public void deleteEquipment(UUID id) {
        equipmentRepository.deleteById(id);
    }
}