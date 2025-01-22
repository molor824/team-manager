package com.example.teammanager.controllers;

import com.example.teammanager.entities.User;
import org.springframework.http.HttpStatus;
import org.springframework.lang.NonNull;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RequestMapping("/api/users")
@RestController
public class UserController {
    @GetMapping("/me")
    public UserResponse authenticatedUser() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        var user = (User) authentication.getPrincipal();
        return new UserResponse(
                user.getFullName(),
                user.getEmail(),
                user.getPhoneNumber(),
                user.getCreatedAt().getTime(),
                user.getUpdatedAt().getTime());
    }

    public record UserResponse(
            @NonNull String fullName,
            @NonNull String email,
            String phoneNumber,
            long createdAt,
            long updatedAt) {
    }
}
