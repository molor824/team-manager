package com.example.teammanager.controllers;

import com.example.teammanager.dtos.EditProfileDto;
import com.example.teammanager.entities.User;
import com.example.teammanager.services.UserService;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/users")
@RestController
public class UserController {
    private final UserService userService;

    public UserController(
            UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public User authenticatedUser() {
        return userService.getCurrentUser();
    }

    @PutMapping("/edit")
    public void editProfile(@RequestBody EditProfileDto dto) {
        userService.editProfile(dto);
    }
}
