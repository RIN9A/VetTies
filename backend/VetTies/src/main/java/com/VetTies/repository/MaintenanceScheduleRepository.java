package com.VetTies.repository;

import com.VetTies.model.MaintenanceSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface MaintenanceScheduleRepository extends JpaRepository<MaintenanceSchedule, UUID> {
    List<MaintenanceSchedule> findByEquipmentId(UUID equipmentId);
    List<MaintenanceSchedule> findByNextMaintenanceDateBetween(LocalDate start, LocalDate end);
    Optional<MaintenanceSchedule> findByEquipmentIdAndMaintenanceType(UUID equipmentId, String maintenanceType);
}
