package com.example.teammanager.controllers;

import com.example.teammanager.dtos.EditProfileDto;
import com.example.teammanager.dtos.UserResponseDto;
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
    public UserResponseDto authenticatedUser() {
        var user = userService.getCurrentUser();
        return new UserResponseDto(
                user.getFullName(),
                user.getEmail(),
                user.getPhoneNumber(),
                user.getCreatedAt().getTime(),
                user.getUpdatedAt().getTime());
    }

    @PutMapping("/edit")
    public void editProfile(@RequestBody EditProfileDto dto) {
        userService.editProfile(dto);
    }
}
