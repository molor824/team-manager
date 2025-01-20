package com.example.teammanager.services;

import com.example.teammanager.dtos.LoginUserDto;
import com.example.teammanager.dtos.RegisterUserDto;
import com.example.teammanager.entities.User;
import com.example.teammanager.repositories.UserRepository;
import com.sun.jdi.request.InvalidRequestStateException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthenticationService(
            UserRepository repository,
            PasswordEncoder encoder,
            AuthenticationManager manager
    ) {
        this.userRepository = repository;
        this.passwordEncoder = encoder;
        this.authenticationManager = manager;
    }

    public Optional<User> signup(RegisterUserDto dto) {
        if (userRepository.findByEmail(dto.email()).isPresent()) {
            return Optional.empty();
        }

        User user = new User();
        user.setEmail(dto.email());
        user.setFullName(dto.fullName());
        user.setPhoneNumber(dto.phoneNumber());
        user.setPassword(passwordEncoder.encode(dto.password()));

        return Optional.of(userRepository.save(user));
    }

    public Optional<User> authenticate(LoginUserDto dto) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                dto.email(),
                dto.password()
        ));
        return userRepository.findByEmail(dto.email());
    }
}
