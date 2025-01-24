package com.example.teammanager.dtos;

import com.example.teammanager.entities.Team;
import lombok.NonNull;

public record TeamResponseDto(
        Long id,
        @NonNull String name,
        @NonNull String description
) {
    public TeamResponseDto(Team team) {
        this(team.getId(), team.getName(), team.getDescription());
    }
}
