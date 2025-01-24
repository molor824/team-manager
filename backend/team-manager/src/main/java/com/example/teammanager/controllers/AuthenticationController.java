package com.example.teammanager.controllers;

import com.example.teammanager.dtos.LoginResponseDto;
import com.example.teammanager.dtos.LoginUserDto;
import com.example.teammanager.dtos.RegisterUserDto;
import com.example.teammanager.dtos.UserDto;
import com.example.teammanager.services.AuthenticationService;
import com.example.teammanager.services.JwtService;
import com.example.teammanager.services.TeamService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/auth")
@RestController
public class AuthenticationController {

    private final JwtService jwtService;
    private final AuthenticationService authenticationService;
    private final TeamService teamService; // Inject TeamService for team-related operations

    public AuthenticationController(
            JwtService jwtService,
            AuthenticationService authenticationService,
            TeamService teamService // Constructor injection for TeamService
    ) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
        this.teamService = teamService;
    }

    @PostMapping("/signup")
    public LoginResponseDto signup(@RequestBody RegisterUserDto dto) {
        authenticationService.signup(dto);
        return login(new LoginUserDto(dto.email(), dto.password()));
    }

    @GetMapping("/exists")
    public boolean exists(@RequestParam(name = "user") String user) {
        return authenticationService.userExists(user); // Check if user exists
    }

    @GetMapping("/{teamId}/users")
    public List<UserDto> getUsersInTeam(@PathVariable Integer teamId) {
        // Fetch users in the specified team using TeamService
        var users = teamService.getUsersInTeam(teamId);

        // Map User entities to UserDto
        // Ensure correct getters

        return users.stream()
                .map(user -> new UserDto((long) user.getId(), user.getEmail(), user.getFullName())) // Ensure correct getters
                .toList();
    }

    @PostMapping("/login")
    public LoginResponseDto login(@RequestBody LoginUserDto dto) {
        var authenticatedUser = authenticationService.authenticate(dto);
        var jwtToken = jwtService.generateToken(authenticatedUser);
        return new LoginResponseDto(jwtToken);
    }
}
