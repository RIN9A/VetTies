package com.VetTies.controller;

import com.VetTies.DTOs.LoginUserDto;
import com.VetTies.DTOs.RegisterUserDto;
import com.VetTies.DTOs.UserDto;
import com.VetTies.model.User;
import com.VetTies.payload.response.LoginResponse;
import com.VetTies.service.JwtService;
import com.VetTies.service.AuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/auth")
@RestController
public class AuthenticationController {
    private final JwtService jwtService;
    private final AuthenticationService authenticationService;


    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/signup")
    public ResponseEntity<User> register(@RequestBody RegisterUserDto registerUserDto) {
        User registerUser = authenticationService.signup(registerUserDto);
        return ResponseEntity.ok(registerUser);
    }

    @PostMapping("/update-password")
    public ResponseEntity<String> updatePassword(@RequestBody LoginUserDto loginUserDto) {
        authenticationService.updatePassword(loginUserDto);
        return ResponseEntity.ok("Пароль успешно изменен");
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginUserDto loginUserDto) {
        User authUser = authenticationService.authenticate(loginUserDto);

            String jwtToken = jwtService.generateToken(authUser);
            LoginResponse loginResponse = new LoginResponse()
                    .setToken(jwtToken)
                    .setExpiresIn(jwtService.getExpiration())
                    .setId(authUser.getId())
                    .setEmail(authUser.getEmail())
                    .setLastName(authUser.getLastName())
                    .setFirstName(authUser.getFirstName());
            return ResponseEntity.ok(loginResponse);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response) {
        request.getSession().invalidate();

        // Если используешь JWT, можно добавить токен в "черный список" (реализуй логику в JwtService)
        return ResponseEntity.ok("Выход выполнен успешно");
    }
}
