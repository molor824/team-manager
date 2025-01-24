package com.example.teammanager.exception;

public class TeamNotFoundException extends BaseException {
    public TeamNotFoundException(String message) {
        super(message);
    }

    public static TeamNotFoundException withId(Long id) {
        return new TeamNotFoundException("Team with id %s not found".formatted(id));
    }
}
