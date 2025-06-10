package com.VetTies.service;

import com.VetTies.DTOs.UserDto;
import com.VetTies.model.ERole;
import com.VetTies.model.Role;
import com.VetTies.model.User;
import com.VetTies.repository.RoleRepository;
import com.VetTies.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserService {
    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    public UserService(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    public List<UserDto> getUserByRole(String roleInput) {
        ERole roleEnum = ERole.valueOf(roleInput.toUpperCase());
        Role role = this.roleRepository.findByName(roleEnum).orElseThrow();
        return userRepository.findByRole(role).stream().map(this::convertToDto).toList();

    }


    public UserDto getUserById(UUID id) {
        return convertToDto(userRepository.findById(id).orElseThrow());
    }
    public List<UserDto> allUsers() {
        return userRepository.findAll().stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public UserDto updateUser(UUID id, UserDto userDetails) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Пользователь не найден"));

        user.setFirstName(userDetails.getFirstName())
                .setLastName(userDetails.getLastName());
        return convertToDto(userRepository.save(user));
    }


    public void deleteUser(UUID id) {
        userRepository.deleteById(id);
    }

    private UserDto convertToDto(User user) {
        return new UserDto().setId(user.getId())
                .setPhoneNumber(user.getPhoneNumber())
                .setEmail(user.getEmail())
                .setFirstName(user.getFirstName())
                .setLastName(user.getLastName());

    }
}
