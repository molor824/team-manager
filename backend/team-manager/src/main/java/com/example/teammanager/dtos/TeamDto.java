package com.example.teammanager.dtos;

import lombok.Data;
import lombok.NonNull;

@Data
public class TeamDto {
    @NonNull
    private String name;

    private String description;
}
