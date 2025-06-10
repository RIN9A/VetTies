package com.VetTies;

import com.VetTies.DTOs.AppointmentDto;
import com.VetTies.DTOs.PetDto;
import com.VetTies.DTOs.VetDto;
import com.VetTies.model.*;
import com.VetTies.repository.*;
import com.VetTies.service.AppointmentService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AppointmentServiceTest {

    @Mock
    private PetRepository petRepository;
    @Mock
    private VetRepository vetRepository;
    @Mock
    private UserRepository userRepository;
    @Mock
    private AppointmentRepository appointmentRepository;
    @Mock
    private StatusRepository statusRepository;
    @Mock
    private WorkingHourRepository workingHourRepository;

    @InjectMocks
    private AppointmentService appointmentService;

    @Test
    void getAllAppointments_shouldReturnList() {
        Appointment appointment = new Appointment();
        appointment.setAppointmentId(UUID.randomUUID());
        appointment.setName("Checkup");
        appointment.setAppointmentTime(LocalDateTime.now());
        appointment.setPet(new Pet());
        appointment.setVet(new Vet());
        appointment.setStatus(new AppointmentStatus().setStatusId(UUID.randomUUID()).setStatusName("SCHEDULED"));

        when(appointmentRepository.findAll()).thenReturn(List.of(appointment));

        List<AppointmentDto> result = appointmentService.getAllAppointments();
        assertEquals(1, result.size());
        assertEquals("Checkup", result.get(0).getName());
    }

    @Test
    void getAppointmentByUser_shouldReturnAppointments() {
        UUID userId = UUID.randomUUID();
        User user = new User(); user.setId(userId);
        Pet pet = new Pet(); pet.setId(UUID.randomUUID()); pet.setOwner(user);
        Appointment appointment = new Appointment(); appointment.setPet(pet);
        appointment.setVet(new Vet()); appointment.setStatus(new AppointmentStatus().setStatusId(UUID.randomUUID()).setStatusName("SCHEDULED"));
        appointment.setAppointmentTime(LocalDateTime.now());

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(petRepository.findByOwner(user)).thenReturn(List.of(pet));
        when(appointmentRepository.findByPet(pet)).thenReturn(List.of(appointment));

        List<AppointmentDto> result = appointmentService.getAppointmentByUser(userId);
        assertEquals(1, result.size());
    }

    @Test
    void createAppointment_shouldSaveAndReturnDto() {
        UUID vetId = UUID.randomUUID();
        UUID petId = UUID.randomUUID();

        Vet vet = new Vet(); vet.setId(vetId); vet.setUser(new User());
        Pet pet = new Pet(); pet.setId(petId); pet.setOwner(new User());
        AppointmentStatus status = new AppointmentStatus().setStatusId(UUID.randomUUID()).setStatusName("ЗАПРОШЕНО");

        AppointmentDto dto = new AppointmentDto()
                .setName("Вакцинация")
                .setAppointmentTime(LocalDateTime.now())
                .setVetDto(new VetDto().setId(vetId))
                .setPetDto(new PetDto().setId(petId))
                .setStatus("ЗАПРОШЕНО");

        when(vetRepository.findById(vetId)).thenReturn(Optional.of(vet));
        when(petRepository.findById(petId)).thenReturn(Optional.of(pet));
        when(statusRepository.findByStatusName("ЗАПРОШЕНО")).thenReturn(Optional.of(status));

        ArgumentCaptor<Appointment> appointmentCaptor = ArgumentCaptor.forClass(Appointment.class);
        when(appointmentRepository.save(any(Appointment.class))).thenAnswer(inv -> inv.getArgument(0));

        AppointmentDto result = appointmentService.createAppointment(dto);

        verify(appointmentRepository).save(appointmentCaptor.capture());
        assertEquals("Вакцинация", result.getName());
        assertEquals("ЗАПРОШЕНО", result.getStatus());
    }

    @Test
    void updateAppointment_shouldUpdateAndReturnDto() {
        UUID id = UUID.randomUUID();
        Appointment existing = new Appointment();
        existing.setAppointmentId(id);
        existing.setName("Old name");
        existing.setAppointmentTime(LocalDateTime.now());
        existing.setStatus(new AppointmentStatus().setStatusId(UUID.randomUUID()).setStatusName("SCHEDULED"));

        AppointmentDto updatedDto = new AppointmentDto()
                .setName("New name")
                .setAppointmentTime(LocalDateTime.now().plusDays(1))
                .setStatus("COMPLETED");

        when(appointmentRepository.findById(id)).thenReturn(Optional.of(existing));
        when(statusRepository.findByStatusName("COMPLETED")).thenReturn(Optional.of(new AppointmentStatus().setStatusId(UUID.randomUUID()).setStatusName("COMPLETED")));
        when(appointmentRepository.save(any(Appointment.class))).thenAnswer(inv -> inv.getArgument(0));

        AppointmentDto result = appointmentService.updateAppointment(id, updatedDto);
        assertEquals("New name", result.getName());
        assertEquals("COMPLETED", result.getStatus());
    }

    @Test
    void deleteAppointment_shouldCallRepository() {
        UUID id = UUID.randomUUID();
        appointmentService.deleteAppointment(id);
        verify(appointmentRepository).deleteById(id);
    }

    @Test
    void getAvailableSlots_shouldReturnSlots() {
        UUID vetId = UUID.randomUUID();
        Vet vet = new Vet(); vet.setId(vetId);
        WorkingHour hour = new WorkingHour();
        hour.setDayOfWeek(LocalDate.now().getDayOfWeek());
        hour.setStartTime(LocalTime.of(10, 0));
        hour.setEndTime(LocalTime.of(11, 0));

        when(vetRepository.findById(vetId)).thenReturn(Optional.of(vet));
        when(appointmentRepository.findByVetAndAppointmentTimeBetween(any(), any(), any()))
                .thenReturn(Collections.emptyList());
        when(workingHourRepository.findByVet(vet)).thenReturn(List.of(hour));

        List<LocalDateTime> slots = appointmentService.getAvailableSlots(vetId, 1, 30);
        assertTrue(slots.isEmpty());
        assertTrue(slots.stream().allMatch(slot -> slot.getHour() == 10));
    }
}
