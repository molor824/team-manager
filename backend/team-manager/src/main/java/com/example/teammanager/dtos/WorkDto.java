package com.example.teammanager.dtos;

import org.springframework.lang.NonNull;

public record WorkDto(Long id, String title, @NonNull String description, String status, @NonNull Long projectId, Long assignedUserId) { }
