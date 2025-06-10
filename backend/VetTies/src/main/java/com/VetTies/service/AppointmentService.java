package com.VetTies.service;


import com.VetTies.DTOs.AppointmentDto;
import com.VetTies.DTOs.PetDto;
import com.VetTies.DTOs.UserDto;
import com.VetTies.DTOs.VetDto;
import com.VetTies.model.*;
import com.VetTies.repository.*;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class AppointmentService {
    private final PetRepository petRepository;
    private final VetRepository vetRepository;
    private final UserRepository userRepository;
    private final AppointmentRepository appointmentRepository;
    private final StatusRepository statusRepository;
    private final WorkingHourRepository workingHourRepository;

    public AppointmentService(PetRepository petRepository, VetRepository vetRepository, UserRepository userRepository, AppointmentRepository appointmentRepository, StatusRepository statusRepository, WorkingHourRepository workingHourRepository) {
        this.petRepository = petRepository;
        this.vetRepository = vetRepository;
        this.userRepository = userRepository;
        this.appointmentRepository = appointmentRepository;
        this.statusRepository = statusRepository;
        this.workingHourRepository = workingHourRepository;
    }

    public List<AppointmentDto> getAllAppointments() {
        return appointmentRepository.findAll().stream()
                .map(this::convertToDto).collect(Collectors.toList());
    }

    public List<AppointmentDto> getAppointmentByUser(UUID id) {
        User user = userRepository.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Пользователь не найден")
        );

       List<Pet> pets = petRepository.findByOwner(user);
       List<AppointmentDto> appointments = new ArrayList<>();
       for (Pet pet: pets) {
           appointments.addAll(appointmentRepository.findByPet(pet).stream().map(this::convertToDto).toList());
       }
       return appointments;
    }

    public List<AppointmentDto> getAppointmentsByVet(UUID vetId) {
        Vet vet = vetRepository.findById(vetId)
                .orElseThrow(() -> new RuntimeException("Специалист не найден"));

        return appointmentRepository.findByVet(vet).stream()
                .map(this::convertToDto).collect(Collectors.toList());
    }

    public AppointmentDto getAppointmentById(UUID id) {
        return appointmentRepository.findById(id).map(this::convertToDto)
                .orElseThrow(() -> new RuntimeException("Запись не найдена"));

    }


    public AppointmentDto createAppointment(AppointmentDto appointmentDto) {
        Vet vet = vetRepository.findById(appointmentDto.getVetDto().getId())
                .orElseThrow(() -> new RuntimeException("Специалист не найден"));

        Pet pet = petRepository.findById(appointmentDto.getPetDto().getId())
                .orElseThrow(() -> new RuntimeException("Питомец не найден"));

        AppointmentStatus appointmentStatus = statusRepository.findByStatusName(appointmentDto.getStatus().toUpperCase()).orElseThrow();
        Appointment appointment = new Appointment()
                .setName(appointmentDto.getName())
                .setAppointmentTime(appointmentDto.getAppointmentTime())
                .setPet(pet)
                .setVet(vet)
                .setStatus(appointmentStatus);


        return convertToDto(appointmentRepository.save(appointment));
    }

    public AppointmentDto updateAppointment(UUID id, AppointmentDto updatedApp) {
        Appointment existingApp = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Запись не найдена"));


        existingApp
                .setName(updatedApp.getName())
                .setAppointmentTime(updatedApp.getAppointmentTime())
                .setStatus(
                        statusRepository.findByStatusName(updatedApp.getStatus().toUpperCase()).orElseThrow());
        return convertToDto(appointmentRepository.save(existingApp));
    }

    public List<LocalDateTime> getAvailableSlots(UUID vetId, int daysAhead, int slotMinutes) {
        Vet vet = vetRepository.findById(vetId)
                .orElseThrow(() -> new RuntimeException("Врач не найден"));

        LocalDateTime now = LocalDateTime.now();
        LocalDateTime end = now.plusDays(Math.min(daysAhead, 14)); // Ограничение в 14 дней

        // Получаем уже занятые слоты
        List<LocalDateTime> busySlots = appointmentRepository
                .findByVetAndAppointmentTimeBetween(vet, now, end)
                .stream()
                .map(Appointment::getAppointmentTime)
                .toList();


        // Получаем график врача
        List<WorkingHour> schedule = workingHourRepository.findByVet(vet);

        Map<DayOfWeek, WorkingHour> scheduleMap = schedule.stream()
                .collect(Collectors.toMap(WorkingHour::getDayOfWeek, wh -> wh));

        List<LocalDateTime> availableSlots = new ArrayList<>();

        for (LocalDate date = now.toLocalDate(); !date.isAfter(end.toLocalDate()); date = date.plusDays(1)) {
            DayOfWeek day = date.getDayOfWeek();
            WorkingHour hours = scheduleMap.get(day);
            if (hours == null) continue; // Если врач не работает в этот день
            LocalTime start = hours.getStartTime();
            LocalTime finish = hours.getEndTime();
            for (LocalTime time = start; time.isBefore(finish); time = time.plusMinutes(slotMinutes)) {
                LocalDateTime slot = LocalDateTime.of(date, time);
                if (!busySlots.contains(slot) && slot.isAfter(now)) {
                    availableSlots.add(slot);
                }
            }
        }

        return availableSlots;
    }

    public void deleteAppointment(UUID id) {
        appointmentRepository.deleteById(id);
    }


    private AppointmentDto convertToDto(Appointment appointment) {

        return new AppointmentDto()
                .setId(appointment.getAppointmentId())
                .setName(appointment.getName())
                .setPetDto(convertToDto(appointment.getPet()))
                .setVetDto(convertToDto(appointment.getVet()))
                .setStatus(appointment.getStatus().getStatusName())
                .setAppointmentTime(appointment.getAppointmentTime());

    }

    private PetDto convertToDto(Pet pet) {

        return pet != null ?  new PetDto()
                .setId(pet.getId())
                .setName(pet.getName())
                .setSpecies(pet.getSpecies())
                .setOwner(convertToDto(pet.getOwner()))
                .setBreed(pet.getBreed())
                .setGender(pet.getGender())
                .setWeight(pet.getWeight())
                .setDateOfBirth(pet.getDateOfBirth()) : new PetDto();
    }

    private VetDto convertToDto(Vet vet) {
        return (vet != null ) ? new VetDto()
                .setId(vet.getId())
                .setExperience(vet.getExperience())
                .setSpecialization(vet.getSpecialization())
                .setUser(convertToDto(vet.getUser())) : new VetDto();
    }

    private UserDto convertToDto(User user) {

        return (user != null )  ? new UserDto()
                .setId( user.getId())
                .setFirstName(user.getFirstName())
                .setLastName(user.getLastName())
                .setEmail(user.getEmail())
                .setPhoneNumber(user.getPhoneNumber()) : new UserDto();
    }
}
