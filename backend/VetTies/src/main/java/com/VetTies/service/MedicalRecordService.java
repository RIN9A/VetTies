package com.VetTies.service;


import com.VetTies.DTOs.MedicalRecordDto;
import com.VetTies.DTOs.UserDto;
import com.VetTies.DTOs.VetDto;
import com.VetTies.model.MedicalRecord;
import com.VetTies.model.Vet;
import com.VetTies.repository.MedicalRecordRepository;
import com.VetTies.repository.PetRepository;
import com.VetTies.repository.UserRepository;
import com.VetTies.repository.VetRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class MedicalRecordService {
    private final MedicalRecordRepository medicalRecordRepository;
    private final PetRepository petRepository;
    private final VetRepository vetRepository;

    public MedicalRecordService(MedicalRecordRepository medicalRecordRepository, PetRepository petRepository, VetRepository vetRepository) {
        this.medicalRecordRepository = medicalRecordRepository;
        this.petRepository = petRepository;
        this.vetRepository = vetRepository;
    }

    public String deleteRecord(UUID id)  {
        medicalRecordRepository.deleteById(id);
        return "Запись успешно удалена";
    }
    public MedicalRecordDto createRecord(MedicalRecordDto dto) {
        MedicalRecord record = toEntity(dto);
        record.setPet(petRepository.findById(dto.getPetId())
                .orElseThrow(() -> new RuntimeException("Pet not found")));
        record.setVet(vetRepository.findById(dto.getVetId().getId())
                .orElseThrow(() -> new RuntimeException("Vet not found")));
        medicalRecordRepository.save(record);
        return toDto(record);
    }

    public List<MedicalRecordDto> getRecordsByPet(UUID petId) {
        System.out.println(petId);
        return medicalRecordRepository.findAll()
                .stream()
                .filter(r -> r.getPet().getId().equals(petId))
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public MedicalRecordDto toDto(MedicalRecord r) {
        UserDto userDto = new UserDto()
                .setId(r.getVet().getUser().getId())
                .setPhoneNumber(r.getVet().getUser().getPhoneNumber())
                .setLastName(r.getVet().getUser().getLastName())
                .setEmail(r.getVet().getUser().getEmail())
                .setFirstName(r.getVet().getUser().getFirstName());

        VetDto vetDto = new VetDto()
                .setId(r.getVet().getId())
                .setSpecialization(r.getVet().getSpecialization())
                .setUser(userDto);
        return new MedicalRecordDto()
                .setId(r.getRecordId())
                .setPetId(r.getPet().getId())
                .setVetId(vetDto)
                .setDiagnosis(r.getDiagnosis())
                .setTreatmentPlan(r.getTreatmentPlan())
                .setLabResults(r.getLabResults())
                .setCreatedAt(r.getCreatedAt());
    }

    public MedicalRecord toEntity(MedicalRecordDto dto) {
        return new MedicalRecord()
                .setRecordId(dto.getId())
                .setDiagnosis(dto.getDiagnosis())
                .setTreatmentPlan(dto.getTreatmentPlan())
                .setLabResults(dto.getLabResults())
                .setCreatedAt(dto.getCreatedAt());
    }
}
