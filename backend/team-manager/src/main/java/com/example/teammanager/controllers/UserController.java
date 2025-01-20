package com.example.teammanager.controllers;

import com.example.teammanager.entities.User;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/users")
@RestController
public class UserController {
    @GetMapping("/me")
    public ResponseEntity<User> authenticatedUser() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null) {
            return ResponseEntity.notFound().build();
        }

        var currentUser = (User) authentication.getPrincipal();

        return ResponseEntity.ok(currentUser);
    }
}
