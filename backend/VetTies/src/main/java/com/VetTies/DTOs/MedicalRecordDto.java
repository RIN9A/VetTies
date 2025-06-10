package com.VetTies.DTOs;

import java.time.LocalDate;
import java.util.UUID;

public class MedicalRecordDto {
    private UUID id;
    private UUID petId;
    private VetDto vetDto;
    private String diagnosis;
    private String treatmentPlan;
    private String labResults;
    private LocalDate createdAt;

    public UUID getId() {
        return id;
    }

    public MedicalRecordDto setId(UUID id) {
        this.id = id;
        return this;
    }

    public UUID getPetId() {
        return petId;
    }

    public MedicalRecordDto setPetId(UUID petId) {
        this.petId = petId;
        return this;
    }

    public VetDto getVetId() {
        return vetDto;
    }

    public MedicalRecordDto setVetId(VetDto vetDto) {
        this.vetDto = vetDto;
        return this;
    }

    public String getDiagnosis() {
        return diagnosis;
    }

    public MedicalRecordDto setDiagnosis(String diagnosis) {
        this.diagnosis = diagnosis;
        return this;
    }

    public String getTreatmentPlan() {
        return treatmentPlan;
    }

    public MedicalRecordDto setTreatmentPlan(String treatmentPlan) {
        this.treatmentPlan = treatmentPlan;
        return this;
    }

    public String getLabResults() {
        return labResults;
    }

    public MedicalRecordDto setLabResults(String labResults) {
        this.labResults = labResults;
        return this;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public MedicalRecordDto setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
        return this;
    }
}