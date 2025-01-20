package com.example.teammanager.dtos;

import lombok.NonNull;

public record RegisterUserDto(
        @NonNull String email,
        @NonNull String fullName,
        @NonNull String password,
        String phoneNumber
) {}