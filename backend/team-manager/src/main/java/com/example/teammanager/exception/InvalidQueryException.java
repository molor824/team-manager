package com.example.teammanager.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class InvalidQueryException extends StatusException {
    public InvalidQueryException() {
        super("Invalid query");
    }
}
