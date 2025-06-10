package com.VetTies;

import com.VetTies.DTOs.EquipmentDTO;
import com.VetTies.model.Equipment;
import com.VetTies.repository.EquipmentRepository;
import com.VetTies.service.EquipmentService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class EquipmentServiceTest {

    @Mock
    private EquipmentRepository equipmentRepository;

    @InjectMocks
    private EquipmentService equipmentService;

    @Test
    void shouldAddEquipment() {
        EquipmentDTO dto = new EquipmentDTO();
        Equipment saved = new Equipment();

        when(equipmentRepository.save(any())).thenReturn(saved);

        Equipment result = equipmentService.addEquipment(dto);

        assertNotNull(result);
        verify(equipmentRepository).save(any(Equipment.class));
    }

    @Test
    void shouldReturnAllEquipment() {
        when(equipmentRepository.findAll()).thenReturn(List.of(new Equipment(), new Equipment()));

        List<Equipment> equipment = equipmentService.getAllEquipment();

        assertEquals(2, equipment.size());
    }

    @Test
    void shouldReturnEquipmentById() {
        UUID id = UUID.randomUUID();
        Equipment eq = new Equipment();
        when(equipmentRepository.findById(id)).thenReturn(Optional.of(eq));

        Equipment result = equipmentService.getEquipmentById(id);

        assertEquals(eq, result);
    }

    @Test
    void shouldThrowWhenEquipmentNotFound() {
        UUID id = UUID.randomUUID();
        when(equipmentRepository.findById(id)).thenReturn(Optional.empty());

        assertThrows(ResponseStatusException.class, () -> equipmentService.getEquipmentById(id));
    }

    @Test
    void shouldDeleteEquipment() {
        UUID id = UUID.randomUUID();

        equipmentService.deleteEquipment(id);

        verify(equipmentRepository).deleteById(id);
    }
}