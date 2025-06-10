package com.VetTies;

import com.VetTies.model.Vet;
import com.VetTies.repository.AppointmentRepository;
import com.VetTies.repository.ScheduleSlotRepository;
import com.VetTies.repository.VetRepository;
import com.VetTies.repository.WorkingHourRepository;
import com.VetTies.service.ScheduleService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ScheduleServiceTest {

    @Mock
    private VetRepository vetRepository;

    @Mock
    private WorkingHourRepository workingHourRepository;

    @Mock
    private ScheduleSlotRepository slotRepository;

    @Mock
    private AppointmentRepository appointmentRepository;

    @InjectMocks
    private ScheduleService scheduleService;

    @Test
    void shouldReturnAvailableTrueWhenConditionsMet() {
        UUID vetId = UUID.randomUUID();
        LocalDateTime start = LocalDateTime.now().plusDays(1);
        LocalDateTime end = start.plusMinutes(30);

        Vet vet = new Vet().setId(vetId);
        when(slotRepository.countAvailableSlotsForInterval(vetId, start, end)).thenReturn(1L);
        when(vetRepository.findById(vetId)).thenReturn(Optional.of(vet));
        when(appointmentRepository.countByVetAndDateRange(eq(vetId), any(), any())).thenReturn(0L);

        boolean result = scheduleService.isSlotAvailable(vetId, start, end);

        assertTrue(result);
    }

    @Test
    void shouldThrowWhenSlotDurationTooShort() {
        UUID vetId = UUID.randomUUID();
        LocalDateTime start = LocalDateTime.now();
        LocalDateTime end = start.plusMinutes(15);

        assertThrows(IllegalArgumentException.class, () ->
                scheduleService.isSlotAvailable(vetId, start, end));
    }
}
