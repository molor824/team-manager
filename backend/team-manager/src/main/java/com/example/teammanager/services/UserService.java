package com.example.teammanager.services;

import com.example.teammanager.exception.UserNotFoundException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.example.teammanager.dtos.EditProfileDto;
import com.example.teammanager.entities.User;
import com.example.teammanager.repositories.UserRepository;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getCurrentUser() throws UserNotFoundException {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null) {
            throw new UserNotFoundException("Failed to find authenticated user");
        }

        return (User) authentication.getPrincipal();
    }

    public User tryGetUserFromEmail(String email) throws UserNotFoundException {
        return userRepository.findByEmail(email).orElseThrow(() -> UserNotFoundException.withEmail(email));
    }

    public void editProfile(EditProfileDto dto) throws UserNotFoundException {
        var user = getCurrentUser();
        user.setFullName(dto.fullName());
        user.setPhoneNumber(dto.phoneNumber());

        userRepository.save(user);
    }
}
