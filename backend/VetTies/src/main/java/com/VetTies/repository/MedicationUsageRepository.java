package com.VetTies.repository;

import com.VetTies.model.MedicationUsageLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public interface MedicationUsageRepository extends JpaRepository<MedicationUsageLog, UUID> {
    @Query("SELECT m.medication.name, SUM(m.quantityUsed) FROM MedicationUsageLog m WHERE m.usedAt BETWEEN :start AND :end GROUP BY m.medication.name")
    List<Object[]> sumMedicationUsageBetweenDates(
        @Param("start") LocalDateTime start,
        @Param("end") LocalDateTime end);
}