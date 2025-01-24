package com.example.teammanager.dtos;

import org.springframework.lang.NonNull;

public record LoginResponseDto(@NonNull String token) {
    public Object getBody() {
        return null;
    }
}
