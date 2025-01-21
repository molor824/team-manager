package com.example.teammanager.services;

import com.example.teammanager.dtos.LoginUserDto;
import com.example.teammanager.dtos.RegisterUserDto;
import com.example.teammanager.entities.User;
import com.example.teammanager.repositories.UserRepository;
import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

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

    public User signup(RegisterUserDto dto) throws ResponseStatusException {
        if (userRepository.findByEmail(dto.email()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

        User user = new User();
        user.setEmail(dto.email());
        user.setFullName(dto.fullName());
        user.setPhoneNumber(dto.phoneNumber());
        user.setPassword(passwordEncoder.encode(dto.password()));

        return userRepository.save(user);
    }

    public boolean userExists(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    public User authenticate(LoginUserDto dto) throws ResponseStatusException {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                dto.email(),
                dto.password()
        ));
        return userRepository.findByEmail(dto.email())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }
}
