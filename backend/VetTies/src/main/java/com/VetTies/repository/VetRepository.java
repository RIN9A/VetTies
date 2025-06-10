package com.VetTies.repository;

import com.VetTies.model.ERole;
import com.VetTies.model.Role;
import com.VetTies.model.Vet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface VetRepository extends JpaRepository<Vet, UUID> {
    List<Vet> findBySpecialization(String specialization);
}
