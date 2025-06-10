package com.VetTies;

import com.VetTies.DTOs.PetDto;
import com.VetTies.DTOs.UserDto;
import com.VetTies.model.Pet;
import com.VetTies.model.User;
import com.VetTies.repository.PetRepository;
import com.VetTies.repository.UserRepository;
import com.VetTies.service.PetService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class PetServiceTest {

    @Mock
    private PetRepository petRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private PetService petService;

    @Test
    void shouldCreatePet() {
        UUID userId = UUID.randomUUID();
        User user = new User().setId(userId);
        PetDto dto = new PetDto().setName("Rex").setOwner(new UserDto().setId(userId));
        Pet savedPet = new Pet().setId(UUID.randomUUID()).setName("Rex").setOwner(user);

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(petRepository.save(any())).thenReturn(savedPet);

        PetDto result = petService.createPet(dto);

        assertEquals("Rex", result.getName());
    }

    @Test
    void shouldThrowIfOwnerNotFound() {
        UUID userId = UUID.randomUUID();
        PetDto dto = new PetDto().setOwner(new UserDto().setId(userId));

        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> petService.createPet(dto));
    }
}
