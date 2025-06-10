package com.VetTies.repository;


import com.VetTies.model.Vet;
import com.VetTies.model.WorkingHour;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface WorkingHourRepository extends JpaRepository<WorkingHour, UUID> {
    List<WorkingHour> findByVet(Vet vet);
}

