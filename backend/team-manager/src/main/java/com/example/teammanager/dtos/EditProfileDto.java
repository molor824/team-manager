package com.example.teammanager.dtos;

import org.springframework.lang.NonNull;

public record EditProfileDto(@NonNull String fullName, String phoneNumber) {
}
