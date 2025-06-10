package com.VetTies.repository;

import com.VetTies.model.AppointmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface StatusRepository extends JpaRepository<AppointmentStatus, UUID> {
    Optional<AppointmentStatus> findByStatusName(String statusName);
}
