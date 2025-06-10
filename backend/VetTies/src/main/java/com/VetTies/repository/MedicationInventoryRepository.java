package com.VetTies.repository;

import com.VetTies.model.MedicationInventory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface MedicationInventoryRepository extends JpaRepository<MedicationInventory, UUID> {
}
