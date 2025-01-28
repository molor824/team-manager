package com.example.teammanager.services;

import com.example.teammanager.dtos.LoginUserDto;
import com.example.teammanager.dtos.RegisterUserDto;
import com.example.teammanager.entities.User;
import com.example.teammanager.exception.UserExistException;
import com.example.teammanager.exception.UserNotFoundException;
import com.example.teammanager.repositories.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthenticationService(
            UserRepository repository,
            PasswordEncoder encoder,
            AuthenticationManager manager) {
        this.userRepository = repository;
        this.passwordEncoder = encoder;
        this.authenticationManager = manager;
    }

    public void signup(RegisterUserDto dto) {
        if (userRepository.findByEmail(dto.email()).isPresent()) {
            throw new UserExistException("User already exists");
        }

        User user = new User();
        user.setEmail(dto.email());
        user.setFullName(dto.fullName());
        user.setPhoneNumber(dto.phoneNumber());
        user.setPassword(passwordEncoder.encode(dto.password()));

        userRepository.save(user);
    }

    public boolean userExists(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    public User authenticate(LoginUserDto dto) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                dto.email(),
                dto.password()));
        return userRepository.findByEmail(dto.email())
                .orElseThrow(() -> UserNotFoundException.withEmail(dto.email()));
    }
}
