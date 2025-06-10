package com.VetTies.repository;

import com.VetTies.model.MedicationType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface MedicationTypeRepository extends JpaRepository<MedicationType, UUID> {

}
