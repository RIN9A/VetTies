package com.VetTies.DTOs;

public class LoginUserDto {

    private String email;

    private String password;


    public String getEmail() {
        return email;
    }

    public LoginUserDto setEmail(String email) {
        this.email = email;
        return this;

    }

    public String getPassword() {
        return password;
    }

    public LoginUserDto setPassword(String password) {
        this.password = password;
        return this;

    }
}
