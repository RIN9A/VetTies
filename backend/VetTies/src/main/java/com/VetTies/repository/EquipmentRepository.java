package com.VetTies.repository;

import com.VetTies.model.Equipment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface EquipmentRepository extends JpaRepository<Equipment, UUID> {
    List<Equipment> findByStatus(String status);
    List<Equipment> findByLocation(String location);
}
