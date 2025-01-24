package com.example.teammanager.dtos;

import lombok.NonNull;

public record LoginUserDto(@NonNull String email, @NonNull String password) {
}