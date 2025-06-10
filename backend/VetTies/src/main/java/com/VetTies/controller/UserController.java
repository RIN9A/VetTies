package com.VetTies.controller;

import com.VetTies.DTOs.RegisterUserDto;
import com.VetTies.DTOs.UserDto;
import com.VetTies.model.User;
import com.VetTies.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RequestMapping("/users")
@RestController
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }


    @PutMapping("/{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable UUID id, @RequestBody UserDto user) {
        return ResponseEntity.ok(userService.updateUser(id, user));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable UUID id) {
        userService.deleteUser(id);
        return ResponseEntity.ok("Пользователь успешно удален");
    }
    @GetMapping("/roles/{role}")
    public ResponseEntity<List<UserDto>> getUserByRole(@PathVariable String role) {
        return ResponseEntity.ok(userService.getUserByRole(role));
    }

    @GetMapping("/me")
    public ResponseEntity<UserDto> authenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();

        UserDto userDto = new UserDto()
                .setFirstName(currentUser.getFirstName())
                .setLastName(currentUser.getLastName())
                .setEmail(currentUser.getEmail())
                .setPhoneNumber(currentUser.getPhoneNumber())
                .setId(currentUser.getId());


        return ResponseEntity.ok(userDto);
    }

    @GetMapping
    public ResponseEntity<List<UserDto>> allUsers() {
        List <UserDto> users = userService.allUsers();

        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUserByID(@PathVariable UUID id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }
}
