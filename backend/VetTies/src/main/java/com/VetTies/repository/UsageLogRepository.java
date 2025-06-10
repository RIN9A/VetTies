package com.VetTies.repository;

import com.VetTies.model.MedicationUsageLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface UsageLogRepository extends JpaRepository<MedicationUsageLog, UUID> {
}
