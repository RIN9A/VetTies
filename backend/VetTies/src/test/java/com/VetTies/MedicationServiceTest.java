package com.VetTies;

import com.VetTies.DTOs.MedicationDto;
import com.VetTies.DTOs.NotificationMessage;
import com.VetTies.model.Medication;
import com.VetTies.model.MedicationType;
import com.VetTies.repository.MedicationRepository;
import com.VetTies.repository.MedicationTypeRepository;
import com.VetTies.service.MedicationService;
import com.VetTies.service.NotificationWebSocketService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class MedicationServiceTest {

    @Mock
    private MedicationRepository medicationRepository;

    @Mock
    private MedicationTypeRepository typeRepository;

    @Mock
    private NotificationWebSocketService notificationService;

    @InjectMocks
    private MedicationService medicationService;

    @Test
    void shouldGetAllMedications() {
        Medication m = new Medication().setName("Test").setType(new MedicationType());
        when(medicationRepository.findAll()).thenReturn(List.of(m));

        List<MedicationDto> dtos = medicationService.getAllMedications();

        assertEquals(1, dtos.size());
        assertEquals("Test", dtos.get(0).getName());
    }

    @Test
    void shouldThrowIfMedicationNotFound() {
        UUID id = UUID.randomUUID();
        when(medicationRepository.findById(id)).thenReturn(Optional.empty());

        assertThrows(ResponseStatusException.class, () -> medicationService.getMedicationById(id));
    }

    @Test
    void shouldCreateMedication() {
        UUID typeId = UUID.randomUUID();
        MedicationDto dto = new MedicationDto().setTypeId(typeId).setName("Paracetamol");
        MedicationType type = new MedicationType().setTypeId(typeId);
        Medication saved = new Medication().setName("Paracetamol").setType(type);

        when(typeRepository.findById(typeId)).thenReturn(Optional.of(type));
        when(medicationRepository.save(any())).thenReturn(saved);

        MedicationDto result = medicationService.createMedication(dto);

        assertEquals("Paracetamol", result.getName());
    }

    @Test
    void shouldCallWebSocketWhenBelowThreshold() {
        Medication m = new Medication().setName("Aspirin").setQuantity(5).setMinThreshold(10);
        when(medicationRepository.findAll()).thenReturn(List.of(m));

        medicationService.getMedicationsBelowThreshold();

        verify(notificationService).sendAdminNotification(any(NotificationMessage.class));
    }
}
