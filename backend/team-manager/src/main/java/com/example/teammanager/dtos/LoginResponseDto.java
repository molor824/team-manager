package com.example.teammanager.dtos;

import org.springframework.lang.NonNull;

public record LoginResponseDto(Long id, @NonNull String token) {
}

