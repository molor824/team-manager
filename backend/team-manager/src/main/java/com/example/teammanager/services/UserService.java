package com.example.teammanager.services;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.teammanager.dtos.EditProfileDto;
import com.example.teammanager.entities.User;
import com.example.teammanager.repositories.UserRepository;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getCurrentUser() throws ResponseStatusException {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        return (User) authentication.getPrincipal();
    }

    public void editProfile(EditProfileDto dto) throws ResponseStatusException {
        var user = getCurrentUser();
        user.setFullName(dto.fullName());
        user.setPhoneNumber(dto.phoneNumber());

        userRepository.save(user);
    }
}
