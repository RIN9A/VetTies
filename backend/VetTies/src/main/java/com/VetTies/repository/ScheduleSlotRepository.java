package com.VetTies.repository;

import com.VetTies.model.ScheduleSlot;
import com.VetTies.model.Vet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface ScheduleSlotRepository extends JpaRepository<ScheduleSlot, UUID> {
    List<ScheduleSlot> findByVetId(UUID vetId);
    @Query("SELECT s FROM ScheduleSlot s WHERE s.isBooked = false AND s.startTime BETWEEN :start AND :end")
    List<ScheduleSlot> findAvailableSlotsBetween(LocalDateTime start, LocalDateTime end);

    List<ScheduleSlot> findByStartTimeBetween(LocalDateTime start, LocalDateTime end);

    boolean existsByStartTimeBetween(LocalDateTime start, LocalDateTime end);

    @Modifying
    @Query("DELETE FROM ScheduleSlot s WHERE s.endTime < :cutoff AND s.isBooked = false")
    void deleteByEndTimeBeforeAndIsBookedFalse(@Param("cutoff") LocalDateTime cutoff);

    void deleteByStartTimeBetweenAndIsBookedFalse(LocalDateTime start, LocalDateTime end);

    @Query("SELECT COUNT(s) FROM ScheduleSlot s " +
            "WHERE s.vet.id = :vetId " +
            "AND s.isBooked = false " +
            "AND s.startTime <= :startTime " +
            "AND s.endTime >= :endTime")
    long countAvailableSlotsForInterval(
            @Param("vetId") UUID vetId,
            @Param("startTime") LocalDateTime startTime,
            @Param("endTime") LocalDateTime endTime
    );

    List<ScheduleSlot> findByVetIdAndIsBookedFalse(UUID vetId);

    Boolean existsByVetAndStartTimeBetween(Vet vet, LocalDateTime startTime, LocalDateTime endTime);
}
