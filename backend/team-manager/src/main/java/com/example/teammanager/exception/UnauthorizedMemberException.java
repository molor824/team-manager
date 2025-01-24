package com.example.teammanager.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.UNAUTHORIZED, reason = "Not an admin of requested project")
public class UnauthorizedMemberException extends StatusException {
}
