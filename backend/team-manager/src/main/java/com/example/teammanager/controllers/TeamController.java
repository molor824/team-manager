package com.example.teammanager.controllers;

import com.example.teammanager.dtos.TeamDto;
import com.example.teammanager.dtos.TeamResponseDto;
import com.example.teammanager.dtos.UserDto;
import com.example.teammanager.services.TeamService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RequestMapping("/api/teams")
@RestController
public class TeamController {
    private final TeamService teamService;

    public TeamController(TeamService teamService) {
        this.teamService = teamService;
    }

    @PostMapping
    public TeamResponseDto createTeam(@RequestBody TeamDto teamDto) {
        return new TeamResponseDto(teamService.createTeam(teamDto));
    }

    @GetMapping("/{id}")
    public TeamResponseDto getTeamById(@PathVariable Long id) {
        return new TeamResponseDto(teamService.getTeamById(id));
    }

    @GetMapping
    public List<TeamResponseDto> getAllTeams() {
        return teamService.getAllTeams().stream()
                .map(TeamResponseDto::new).collect(Collectors.toList());
    }

    @PutMapping("/{id}")
    public TeamResponseDto updateTeam(@PathVariable Long id, @RequestBody TeamDto teamDto) {
        return new TeamResponseDto(teamService.updateTeam(id, teamDto));
    }

    @DeleteMapping("/{id}")
    public void deleteTeam(@PathVariable Long id) {
        teamService.deleteTeam(id);
    }

    @GetMapping("/{teamId}/users")
    public List<UserDto> getUsersInTeam(@PathVariable Long teamId) {
        var users = teamService.getUsersInTeam(teamId); // This should return a Set<User> or List<User>
        return users.stream()
                .map(user -> new UserDto(user.getId(), user.getEmail(), user.getFullName())) // Adjust `getFullName()` if necessary
                .toList();
    }
}
