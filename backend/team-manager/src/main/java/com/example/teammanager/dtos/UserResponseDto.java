package com.example.teammanager.dtos;

import org.springframework.lang.NonNull;

public record UserResponseDto(@NonNull String fullName,
        @NonNull String email,
        String phoneNumber,
        long createdAt,
        long updatedAt) {
}
