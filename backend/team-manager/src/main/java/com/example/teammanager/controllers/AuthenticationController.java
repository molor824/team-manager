package com.example.teammanager.controllers;

import com.example.teammanager.dtos.LoginUserDto;
import com.example.teammanager.dtos.RegisterUserDto;
import com.example.teammanager.entities.User;
import com.example.teammanager.services.AuthenticationService;
import com.example.teammanager.services.JwtService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/auth")
@RestController
public class AuthenticationController {
    private final JwtService jwtService;
    private final AuthenticationService authenticationService;

    public AuthenticationController(
            JwtService jwtService,
            AuthenticationService authenticationService
    ) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/signup")
    public ResponseEntity<User> signup(@RequestBody RegisterUserDto dto) {
        var registeredUser = authenticationService.signup(dto);
        return registeredUser.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginUserDto dto) {
        var authenticatedUser = authenticationService.authenticate(dto);
        return authenticatedUser.map(user -> {
            String jwtToken = jwtService.generateToken(user);
            LoginResponse response = new LoginResponse(jwtToken, jwtService.getExpirationTime(jwtToken));
            return ResponseEntity.ok(response);
        }).orElse(ResponseEntity.notFound().build());
    }

    public record LoginResponse(String token, long expiresIn) {
    }
}
