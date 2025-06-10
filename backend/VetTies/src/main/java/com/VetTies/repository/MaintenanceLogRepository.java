package com.VetTies.repository;

import com.VetTies.model.MaintenanceLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface MaintenanceLogRepository extends JpaRepository<MaintenanceLog, UUID> {
    List<MaintenanceLog> findByEquipmentIdOrderByMaintenanceDateDesc(UUID equipmentId);
    List<MaintenanceLog> findByMaintenanceDateBetween(LocalDate start, LocalDate end);
}