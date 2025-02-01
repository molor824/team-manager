package com.example.teammanager.dtos;

import com.example.teammanager.entities.User;
import org.springframework.lang.NonNull;

import java.util.List;

public record ProjectResponseDto(
        @NonNull Long id,
        @NonNull String name,
        String description,
        @NonNull List<User> members,
        @NonNull Long adminId,
        @NonNull List<WorkDto> works
) {
}
