package com.VetTies.service;

import com.VetTies.DTOs.LoginUserDto;
import com.VetTies.DTOs.RegisterUserDto;
import com.VetTies.model.ERole;
import com.VetTies.model.Role;
import com.VetTies.model.User;
import com.VetTies.repository.RoleRepository;
import com.VetTies.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public  class AuthenticationService {
    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;
    private final RoleRepository roleRepository;

    public AuthenticationService(
            UserRepository userRepository,
            AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder,
            RoleRepository roleRepository
    ) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
    }

    public User signup(RegisterUserDto input) {
        ERole roleEnum = ERole.valueOf(input.getRole().toUpperCase());
        Role role = this.roleRepository.findByName(roleEnum).orElseThrow();
        if (userRepository.findByEmail(input.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Пользователь с таким email уже зарегистрирован");
        }
        User user = new User()
                .setId(UUID.randomUUID())
                .setFullName(input.getLastName(), input.getFirstName())
                .setEmail(input.getEmail())
                .setPhoneNumber(input.getPhoneNumber())
                .setPassword(passwordEncoder.encode(input.getPassword()))
                .setRole(role);
        return userRepository.save(user);
    }


    public User updatePassword(LoginUserDto loginUserDto) {
        User user = userRepository.findByEmail(loginUserDto.getEmail()).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Пользователь не найден")
        );
        user.setPassword(passwordEncoder.encode(loginUserDto.getPassword()));
        return userRepository.save(user);
    }

    public User authenticate(LoginUserDto input) {
      User user = userRepository.findByEmail(input.getEmail()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Пользователь не найден"));

      authenticationManager.authenticate(
              new UsernamePasswordAuthenticationToken(
                            input.getEmail(),
                            input.getPassword()
                    )
            );

        return user;
    }

    public List<User> allUsers() {
        List<User> users = new ArrayList<>();

        userRepository.findAll().forEach(users::add);

        return users;
    }
}
