package com.VetTies.repository;

import com.VetTies.model.VetPreference;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface VetPreferenceRepository  extends JpaRepository<VetPreference, UUID> {
    @Query("SELECT vp FROM VetPreference vp WHERE vp.vetId IN :vetIds")
    List<VetPreference> findByVetIdIn(@Param("vetIds") List<UUID> vetIds);

    @Query("SELECT vp FROM VetPreference vp WHERE vp.vetId = :vetId AND vp.preferredDay = :day")
    Optional<VetPreference> findByVetIdAndDay(@Param("vetId") UUID vetId,
                                              @Param("day") DayOfWeek day);

    @Modifying
    @Query("UPDATE VetPreference vp SET vp.preferredStartTime = :startTime, " +
            "vp.preferenceWeight = :weight WHERE vp.id = :id")
    void updatePreference(@Param("id") UUID id,
                          @Param("startTime") LocalTime startTime,
                          @Param("weight") double weight);
}
