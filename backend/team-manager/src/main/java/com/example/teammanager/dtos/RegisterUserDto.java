package com.example.teammanager.dtos;

import org.springframework.lang.NonNull;

public record RegisterUserDto(
        @NonNull String email,
        @NonNull String fullName,
        @NonNull String password,
        String phoneNumber) {
}