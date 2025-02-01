package com.example.teammanager.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND, reason = "Project not found")
public class ProjectNotFoundException extends StatusException {
    public ProjectNotFoundException(String message) {
        super(message);
    }

    public static ProjectNotFoundException withId(Long id) {
        return new ProjectNotFoundException("Project with id %d not found".formatted(id));
    }
    public static ProjectNotFoundException withName(String name) {
        return new ProjectNotFoundException("Project with name %s not found".formatted(name));
    }
}
