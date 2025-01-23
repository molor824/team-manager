package com.example.teammanager.controllers;

import com.example.teammanager.dtos.LoginUserDto;
import com.example.teammanager.dtos.RegisterUserDto;
import com.example.teammanager.dtos.UserDto;
import com.example.teammanager.services.AuthenticationService;
import com.example.teammanager.services.JwtService;
import com.example.teammanager.services.TeamService;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
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
    public ResponseEntity<LoginResponse> signup(@RequestBody RegisterUserDto dto) {
        authenticationService.signup(dto); // Sign up the user
        var loginResponse = login(new LoginUserDto(dto.email(), dto.password())); // Automatically log in
        return ResponseEntity.ok(loginResponse);
    }

    @GetMapping("/exists")
    public boolean exists(@RequestParam(name = "user") String user) {
        return authenticationService.userExists(user); // Check if user exists
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginUserDto dto) {
        var authenticatedUser = authenticationService.authenticate(dto); // Authenticate the user
        var jwtToken = jwtService.generateToken(authenticatedUser); // Generate JWT token
        return new LoginResponse(jwtToken, (long) authenticatedUser.getId());
    }

    public record LoginResponse(@NonNull String token, @NonNull Long userId) {
        public Integer getId() {
            return Math.toIntExact(userId); // Convert Long to Integer
        }
    }

    @GetMapping("/{teamId}/users")
    public ResponseEntity<List<UserDto>> getUsersInTeam(@PathVariable Integer teamId) {
        // Fetch users in the specified team using TeamService
        var users = teamService.getUsersInTeam(teamId);

        // Map User entities to UserDto
        var userDto = users.stream()
                .map(user -> new UserDto((long) user.getId(), user.getEmail(), user.getFullName())) // Ensure correct getters
                .toList();

        return ResponseEntity.ok(userDto);
    }
}
