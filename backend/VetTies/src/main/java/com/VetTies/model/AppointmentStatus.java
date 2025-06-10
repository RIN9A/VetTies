package com.VetTies.model;

import jakarta.persistence.*;
import org.hibernate.annotations.UuidGenerator;

import java.util.UUID;

@Entity
@Table(name = "appointment_statuses")

public class AppointmentStatus {

    @Id
    @GeneratedValue(generator = "UUID")
    @UuidGenerator
    private UUID statusId;

    @Column(name = "status_name", unique = true, nullable = false)
    private String statusName;

    public AppointmentStatus(UUID statusId, String statusName) {
        this.statusId = statusId;
        this.statusName = statusName;
    }

    public AppointmentStatus() {
    }

    public UUID getStatusId() {
        return statusId;
    }

    public AppointmentStatus setStatusId(UUID statusId) {
        this.statusId = statusId;
        return this;

    }

    public String getStatusName() {
        return statusName;
    }

    public AppointmentStatus setStatusName(String statusName) {
        this.statusName = statusName;
        return this;
    }
}