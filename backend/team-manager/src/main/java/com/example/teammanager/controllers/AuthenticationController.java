package com.example.teammanager.controllers;

import com.example.teammanager.dtos.LoginUserDto;
import com.example.teammanager.dtos.RegisterUserDto;
import com.example.teammanager.services.AuthenticationService;
import com.example.teammanager.services.JwtService;

import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/auth")
@RestController
public class AuthenticationController {
    private final JwtService jwtService;
    private final AuthenticationService authenticationService;

    public AuthenticationController(
            JwtService jwtService,
            AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/signup")
    public LoginResponse signup(@RequestBody RegisterUserDto dto) {
        authenticationService.signup(dto);
        return login(new LoginUserDto(dto.email(), dto.password()));
    }

    @GetMapping("/exists")
    public boolean exists(@RequestParam(name = "user") String user) {
        return authenticationService.userExists(user);
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginUserDto dto) {
        var authenticatedUser = authenticationService.authenticate(dto);
        var jwtToken = jwtService.generateToken(authenticatedUser);
        return new LoginResponse(jwtToken, jwtService.getExpirationTime(jwtToken));
    }

    public record LoginResponse(@NonNull String token, long expiresIn) {
    }
}
