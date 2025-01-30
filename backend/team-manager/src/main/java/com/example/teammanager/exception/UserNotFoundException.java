package com.example.teammanager.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.UNAUTHORIZED, reason = "No such user")
public class UserNotFoundException extends StatusException {
    public UserNotFoundException(String message) {
        super(message);
    }
    public static UserNotFoundException withEmail(String email) {
        return new UserNotFoundException("User with email %s not found".formatted(email));
    }
    public static UserNotFoundException withId(Long id) {
        return new UserNotFoundException("User with id %s not found".formatted(id));
    }
}
