package com.VetTies.repository;

import com.VetTies.model.Appointment;
import com.VetTies.model.Pet;
import com.VetTies.model.Vet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, UUID> {
    List<Appointment> findByVet(Vet vet);
    List<Appointment> findByPet(Pet pet);
    List<Appointment> findByVetAndAppointmentTimeBetween(Vet vet, LocalDateTime start, LocalDateTime end);

    List<Appointment> findByAppointmentTimeBetween(LocalDateTime start, LocalDateTime end);

    @Query("SELECT a.vet, COUNT(a) FROM Appointment a WHERE a.appointmentTime BETWEEN :start AND :end GROUP BY a.vet")
    List<Object[]> countAppointmentsByVetBetweenDates(
            @Param("start") LocalDateTime start,
            @Param("end") LocalDateTime end);

    @Query("SELECT COUNT(a) FROM Appointment a " +
            "WHERE a.slot.vet.id = :vetId " +
            "AND a.slot.startTime BETWEEN :startDate AND :endDate")
    long countByVetAndDateRange(
            @Param("vetId") UUID vetId,
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate
    );
}

