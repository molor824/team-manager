package com.example.teammanager.exception;

public class TeamExistException extends BaseException {
    public TeamExistException(String message) {
        super(message);
    }
    public static TeamExistException withName(String name) {
        return new TeamExistException("Team with name %s already exists".formatted(name));
    }
}
