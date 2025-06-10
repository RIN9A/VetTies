package com.VetTies.DTOs;

import com.VetTies.model.Role;

public class RegisterUserDto {
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String role;



    public String getEmail() {
        return email;
    }

    public RegisterUserDto setEmail(String email) {
        this.email = email;
        return this;

    }

    public String getPassword() {
        return password;
    }

    public RegisterUserDto setPassword(String password) {
        this.password = password;
        return this;

    }

    public String getFullName() {
        return this.lastName + ' ' + this.firstName;
    }

    public RegisterUserDto setFullName(String lastName, String firstName) {
        this.lastName = lastName;
        this.firstName = firstName;
        return this;
    }

    public String getFirstName() {
        return firstName;
    }

    public RegisterUserDto setFirstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public String getLastName() {
        return lastName;
    }

    public RegisterUserDto setLastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public RegisterUserDto setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
        return this;
    }

    public String getRole() {
        return role;
    }

    public RegisterUserDto setRole(String role) {
        this.role = role;
        return this;
    }

    @Override
    public String toString() {
        return "RegisterUserDto{" +
                "email='" + email + '\'' +
                ", fullName='" + lastName + ' '  + firstName+ '\'' +
                '}';
    }
}
