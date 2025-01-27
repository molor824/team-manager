package com.example.teammanager.dtos;

import com.example.teammanager.entities.Project;
import lombok.NonNull;

public record ProjectResponseDto(
        Long id,
        @NonNull String name,
        @NonNull String description
) {
    public ProjectResponseDto(Project project) {
        this(project.getId(), project.getName(), project.getDescription());
    }
}
