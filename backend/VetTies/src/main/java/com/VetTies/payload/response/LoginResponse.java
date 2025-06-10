package com.VetTies.payload.response;

import com.VetTies.model.User;

import java.util.UUID;

public class LoginResponse {
    private String token;

    private Long expiresIn;

    private UUID id;
    private String email;
    private String lastName;
    private String firstName;

    public UUID getId() {
        return id;
    }

    public LoginResponse setId(UUID id) {
        this.id = id;
        return this;
    }

    public LoginResponse setFullName(String lastName, String firstName) {
        this.lastName = lastName;
        this.firstName = firstName;
        return this;
    }

    public String getEmail() {
        return email;
    }

    public LoginResponse setEmail(String email) {
        this.email = email;
        return this;

    }

    public String getLastName() {
        return lastName;
    }

    public LoginResponse setLastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public String getFirstName() {
        return firstName;
    }

    public LoginResponse setFirstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public String getToken() {
        return token;
    }

    public LoginResponse setToken(String token) {
        this.token = token;
        return this;
    }

    public Long getExpiresIn() {
        return expiresIn;
    }

    public LoginResponse setExpiresIn(Long expiresIn) {
        this.expiresIn = expiresIn;
        return this;
    }
    @Override
    public String toString() {
        return "LoginResponse{" +
                "token='" + token + '\'' +
                ", expiresIn=" + expiresIn +
                '}';
    }
}
