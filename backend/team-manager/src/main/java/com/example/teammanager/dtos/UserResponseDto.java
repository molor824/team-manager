package com.example.teammanager.dtos;

import org.springframework.lang.NonNull;

import java.util.Date;

public record UserResponseDto(@NonNull String fullName,
                              @NonNull String email,
                              String phoneNumber,
                              Date createdAt,
                              Date updatedAt) {
}
