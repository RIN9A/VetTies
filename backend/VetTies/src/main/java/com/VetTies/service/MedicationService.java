package com.VetTies.service;

import com.VetTies.DTOs.MedicationDto;
import com.VetTies.DTOs.NotificationMessage;
import com.VetTies.model.Medication;
import com.VetTies.model.MedicationType;
import com.VetTies.repository.MedicationRepository;
import com.VetTies.repository.MedicationTypeRepository;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class MedicationService {

    private final MedicationRepository medicationRepository;
    private final MedicationTypeRepository medicationTypeRepository;
    private final NotificationWebSocketService notificationWebSocketService;

    public MedicationService(MedicationRepository medicationRepository, MedicationTypeRepository medicationTypeRepository, NotificationWebSocketService notificationWebSocketService) {
        this.medicationRepository = medicationRepository;
        this.medicationTypeRepository = medicationTypeRepository;
        this.notificationWebSocketService = notificationWebSocketService;
    }

    public void trackStock() {
        List<Medication> meds = medicationRepository.findAll();
        for (Medication m : meds) {
            if (m.getQuantity() <= m.getMinThreshold()) {
                // логика оповещения или создания заявки
                System.out.println("Reorder needed: " + m.getName());
            }
        }
    }

    public List<MedicationDto> getAllMedications() {
        return medicationRepository.findAll().stream().map(this::toDto).toList();
    }

    public MedicationDto getMedicationById(UUID id) {
        return toDto(
                medicationRepository.findById(id).orElseThrow(
                        () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Препарат не найден")
                ));
    }

    public MedicationDto updateMedication(UUID id, MedicationDto medicationDto) {
        Medication medication = medicationRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Препарат не найден"));
        MedicationType type = medicationTypeRepository.findById(medicationDto.getTypeId()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Тип препарата не найден"));
        medication.setExpiryDate(medicationDto.getExpiryDate())
                .setType(type)
                .setQuantity(medicationDto.getQuantity())
                .setName(medicationDto.getName())
                .setUpdatedAt(LocalDateTime.now())
                .setMinThreshold(medicationDto.getMinThreshold());

        return toDto(medicationRepository.save(medication));
    }
    public MedicationDto createMedication(MedicationDto medicationDto) {
        MedicationType type = medicationTypeRepository.findById(medicationDto.getTypeId()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Тип препарата не найден"));
        Medication medication = medicationDto.getName() != null ? new Medication()
                .setExpiryDate(medicationDto.getExpiryDate())
                .setType(type)
                .setQuantity(medicationDto.getQuantity() != null ? medicationDto.getQuantity(): 100)
                .setName(medicationDto.getName())
                .setMinThreshold(medicationDto.getMinThreshold() != null ? medicationDto.getMinThreshold() : 10) : new Medication();
        return toDto(medicationRepository.save(medication));
    }

    public List<MedicationType> getAllMedType() {
        return medicationTypeRepository.findAll(Sort.by("typeName"));
    }

    public void deleteMedication(UUID id) {
        medicationRepository.deleteById(id);
    }
    public List<MedicationDto> getExpiringMedications() {
        LocalDate soon = LocalDate.now().plusMonths(1);
        return medicationRepository.findAll()
                .stream().filter(m -> m.getExpiryDate().isBefore(soon))
                .map(this::toDto).collect(Collectors.toList());
    }

//    @Scheduled(fixedRate = 180000)

    @Scheduled(fixedRate = 30000)
    public void getMedicationsBelowThreshold() {
        List<Medication> lowStock = medicationRepository.findAll().stream()
                .filter(med -> med.getQuantity() <= med.getMinThreshold())
                .toList();
        System.out.println(lowStock.size());
        if (!lowStock.isEmpty()) {
            NotificationMessage notificationMessage = new NotificationMessage()
                    .setTitle("Предупреждение: Низкий уровень следующих препаратов:\n");
            StringBuilder message = new StringBuilder();
            for (Medication med : lowStock) {
                message.append(String.format("- %s (Остаток: %d, Минимум: %d)\n",
                        med.getName(), med.getQuantity(), med.getMinThreshold()));
            }
            notificationMessage.setBody(message.toString());
            notificationWebSocketService.sendAdminNotification(notificationMessage);
        }
    }

    public void useMedication(UUID id, int quantity) {
        Medication m = medicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Not found"));
        m.setQuantity(m.getQuantity() - quantity);
        medicationRepository.save(m);
    }

    private MedicationDto toDto(Medication m) {
        return m != null? new MedicationDto()
                .setMedicationId(m.getMedicationId())
                .setName(m.getName())
                .setTypeId(m.getType().getTypeId())
                .setTypeName(m.getType().getTypeName())
                .setQuantity(m.getQuantity())
                .setCreatedAt(m.getCreatedAt())
                .setUpdatedAt(m.getUpdatedAt())
                .setExpiryDate(m.getExpiryDate())
                .setMinThreshold(m.getMinThreshold()) : new MedicationDto();
    }
}