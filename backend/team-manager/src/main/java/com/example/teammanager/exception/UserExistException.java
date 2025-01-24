package com.example.teammanager.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT, reason = "User already exist")
public class UserExistException extends StatusException {
    public UserExistException(String message) {
        super(message);
    }
}
