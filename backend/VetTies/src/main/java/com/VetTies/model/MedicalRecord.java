package com.VetTies.model;

import jakarta.persistence.*;
import org.hibernate.annotations.UuidGenerator;;import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "medical_records")
public class MedicalRecord {
    @Id
    @UuidGenerator
    @Column(name = "record_id", updatable = false, nullable = false)
    private UUID recordId;

    @ManyToOne
    @JoinColumn(name = "pet_id")
    private Pet pet;

    @ManyToOne
    @JoinColumn(name = "vet_id")
    private Vet vet;

    @Column
    private String diagnosis;

    @Column(name = "treatment_plan")
    private String treatmentPlan;
    @Column(name = "lab_results")
    private String labResults;
    @Column(name = "created_at")
    private LocalDate createdAt;


    public UUID getRecordId() {
        return recordId;
    }

    public MedicalRecord setRecordId(UUID recordId) {
        this.recordId = recordId;
        return this;
    }

    public Pet getPet() {
        return pet;
    }

    public MedicalRecord setPet(Pet pet) {
        this.pet = pet;
        return this;
    }

    public Vet getVet() {
        return vet;
    }

    public MedicalRecord setVet(Vet vet) {
        this.vet = vet;
        return this;
    }

    public String getDiagnosis() {
        return diagnosis;
    }

    public MedicalRecord setDiagnosis(String diagnosis) {
        this.diagnosis = diagnosis;
        return this;
    }

    public String getTreatmentPlan() {
        return treatmentPlan;
    }

    public MedicalRecord setTreatmentPlan(String treatmentPlan) {
        this.treatmentPlan = treatmentPlan;
        return this;
    }

    public String getLabResults() {
        return labResults;
    }

    public MedicalRecord setLabResults(String labResults) {
        this.labResults = labResults;
        return this;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public MedicalRecord setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
        return this;
    }
}