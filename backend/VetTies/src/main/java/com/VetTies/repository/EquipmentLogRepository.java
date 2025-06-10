package com.VetTies.repository;

import com.VetTies.model.EquipmentLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface EquipmentLogRepository extends JpaRepository<EquipmentLog, Long> {
    List<EquipmentLog> findByMaintenanceDateBetween(LocalDate start, LocalDate end);
}