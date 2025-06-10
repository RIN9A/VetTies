package com.VetTies.model;

import jakarta.persistence.*;
import org.hibernate.annotations.UuidGenerator;

import java.util.UUID;

@Entity
@Table(name = "medication_types")
public class MedicationType {

    @Id
    @UuidGenerator
    @Column(name = "type_id")
    private UUID typeId;

    @Column(name = "type_name", unique = true, nullable = false)
    private String typeName;

    public MedicationType(UUID typeId, String typeName) {
        this.typeId = typeId;
        this.typeName = typeName;
    }

    public MedicationType() {
    }

    public UUID getTypeId() {
        return typeId;
    }

    public MedicationType setTypeId(UUID typeId) {
        this.typeId = typeId;
        return this;
    }

    public String getTypeName() {
        return typeName;
    }

    public MedicationType setTypeName(String typeName) {
        this.typeName = typeName;
        return this;

    }
}