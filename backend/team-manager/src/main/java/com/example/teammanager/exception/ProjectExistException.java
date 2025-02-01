package com.example.teammanager.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT, reason = "Project already exist")
public class ProjectExistException extends StatusException {
    public ProjectExistException(String message) {
        super(message);
    }
    public static ProjectExistException withName(String name) {
        return new ProjectExistException("Project with name %s already exists".formatted(name));
    }
}
