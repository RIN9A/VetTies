package com.VetTies.service;

import com.VetTies.DTOs.PetDto;
import com.VetTies.DTOs.UserDto;
import com.VetTies.model.Pet;
import com.VetTies.model.User;
import com.VetTies.repository.PetRepository;
import com.VetTies.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class PetService {
    private final PetRepository petRepository;
    private final UserRepository userRepository;

    public PetService(PetRepository petRepository, UserRepository userRepository) {
        this.petRepository = petRepository;
        this.userRepository = userRepository;
    }

    public List<PetDto> getAllPets() {
        return petRepository.findAll().stream()
                .map(this::convertToDto).collect(Collectors.toList());

    }

    public List<PetDto> getPetsByOwner(UUID ownerId) {
        User owner = userRepository.findById(ownerId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Владелец не найден"));
        return petRepository.findByOwner(owner).stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public PetDto getPetById(UUID id) {

        return petRepository.findById(id).map(this::convertToDto)
                .orElseThrow(() -> new RuntimeException("Питомец не найден"));

    }

    public PetDto createPet(PetDto petDto) {
        User user = userRepository.findById(petDto.getOwner().getId())
                                .orElseThrow(() -> new RuntimeException("Владелец не найден"));
        Pet pet = new Pet()
                .setName(petDto.getName())
                .setSpecies(petDto.getSpecies())
                .setDateOfBirth(petDto.getDateOfBirth())
                .setWeight(petDto.getWeight())
                .setGender(petDto.getGender())
                .setBreed(petDto.getBreed())
                .setCreatedAt(petDto.getCreatedAt())
                .setOwner(user);

        return convertToDto(petRepository.save(pet));
    }

    public PetDto updatePet(UUID id, PetDto updatedPet) {
        Pet existingPet = petRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Питомец не найден"));

        existingPet.setName(updatedPet.getName())
                .setBreed(updatedPet.getBreed())
                .setSpecies(updatedPet.getSpecies())
                .setGender(updatedPet.getGender())
                .setWeight(updatedPet.getWeight())
                .setDateOfBirth(updatedPet.getDateOfBirth());
        return convertToDto(petRepository.save(existingPet));
    }

    public void deletePet(UUID id) {
        petRepository.deleteById(id);
    }

    private PetDto convertToDto(Pet pet) {

        return new PetDto()
                .setId(pet.getId())
                .setName(pet.getName())
                .setSpecies(pet.getSpecies())
                .setOwner(convertToDto(pet.getOwner()))
                .setBreed(pet.getBreed())
                .setGender(pet.getGender())
                .setWeight(pet.getWeight())
                .setCreatedAt(pet.getCreatedAt())
                .setDateOfBirth(pet.getDateOfBirth());
    }

    private UserDto convertToDto(User user) {
        return new UserDto()
                .setId(user.getId())
                .setFirstName(user.getFirstName())
                .setLastName(user.getLastName())
                .setEmail(user.getEmail())
                .setPhoneNumber(user.getPhoneNumber());
    }

}
