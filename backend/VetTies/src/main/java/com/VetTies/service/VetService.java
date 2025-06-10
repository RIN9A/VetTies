package com.VetTies.service;

import com.VetTies.DTOs.UserDto;
import com.VetTies.DTOs.VetDto;
import com.VetTies.DTOs.WorkingHourDto;
import com.VetTies.model.User;
import com.VetTies.model.Vet;
import com.VetTies.model.WorkingHour;
import com.VetTies.repository.UserRepository;
import com.VetTies.repository.VetRepository;
import com.VetTies.repository.WorkingHourRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.DayOfWeek;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class VetService {
    private final VetRepository vetRepository;
    private final UserRepository userRepository;
    private final WorkingHourRepository workingHourRepository;

    public VetService(VetRepository vetRepository, UserRepository userRepository, WorkingHourRepository workingHourRepository, AuthenticationService authenticationService) {
        this.vetRepository = vetRepository;
        this.userRepository = userRepository;
        this.workingHourRepository = workingHourRepository;
    }

    public VetDto createVet(VetDto vetDto) {
        User user = userRepository.findById(vetDto.getUser().getId())
                .orElseThrow(() -> new RuntimeException("Пользователь не найден"));
        Vet vet = new Vet()
                .setUser(user)
                .setExperience(vetDto.getExperience())
                .setSpecialization(vetDto.getSpecialization());

        return convertToDto(vetRepository.save(vet));
    }

    public WorkingHourDto updateWorkingDay(WorkingHourDto workingHourDto) {
        WorkingHour workingHour = workingHourRepository.findById(workingHourDto.getId()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Запись не найдена"));
        workingHour.setDayOfWeek(DayOfWeek.valueOf(workingHourDto.getDayOfWeek()))
                .setStartTime(workingHourDto.getStartTime())
                .setEndTime(workingHourDto.getEndTime());
        workingHourRepository.save(workingHour);

        return workingHourDto;
    }

    public List<VetDto> getVetsBySpec(String specialization) {
        return vetRepository.findBySpecialization(specialization).stream().map(this::convertToDto).toList();
    }
    public List<VetDto> getAllVets() {
        return vetRepository.findAll().stream().map(this::convertToDto).toList();
    }

    public VetDto getVetById(UUID id) {
        return vetRepository.findById(id).map(this::convertToDto)
                .orElseThrow(() -> new RuntimeException("Ветеринар не найден"));    }

    public VetDto updateVet(UUID id, VetDto vetDto) {
        Vet vet = vetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ветеринар не найден"));

        vet.setSpecialization(vetDto.getSpecialization());
        vet.setExperience(vet.getExperience());
        return convertToDto(vetRepository.save(vet));
    }

    public void deleteVet(UUID id) {
        vetRepository.deleteById(id);
    }

    private VetDto convertToDto(Vet vet) {

        return new VetDto()
                .setId(vet.getId())
                .setExperience(vet.getExperience())
                .setUser(convertToDto(vet.getUser()))
                .setSpecialization(vet.getSpecialization());
    }

    private UserDto convertToDto(User user) {
        return new UserDto()
                .setId(user.getId())
                .setFirstName(user.getFirstName())
                .setLastName(user.getLastName())
                .setEmail(user.getEmail())
                .setPhoneNumber(user.getPhoneNumber());
    }

    public List<WorkingHourDto> getWorkingHoursByVet(UUID id) {
        Vet vet = vetRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,"Ветеринар не найден"));

        return workingHourRepository.findByVet(vet).stream().map(wh -> {
            return new WorkingHourDto()
                    .setId(wh.getId())
                    .setDayOfWeek(wh.getDayOfWeek().name())
                    .setStartTime(wh.getStartTime())
                    .setEndTime(wh.getEndTime());
        }).toList();

    }
}
