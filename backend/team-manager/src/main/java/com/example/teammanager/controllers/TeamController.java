package com.example.teammanager.controllers;

import com.example.teammanager.dtos.TeamDto;
import com.example.teammanager.dtos.UserDto;
import com.example.teammanager.entities.Team;
import com.example.teammanager.services.TeamService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/teams")
@RestController
public class TeamController {
    private final TeamService teamService;

    public TeamController(TeamService teamService) {
        this.teamService = teamService;
    }

    @PostMapping
    public ResponseEntity<Team> createTeam(@RequestBody TeamDto teamDto) {
        System.out.println(teamDto);
        Team createdTeam = teamService.createTeam(teamDto);
        return ResponseEntity.ok(createdTeam);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Team> getTeamById(@PathVariable Integer id) {
        Team team = teamService.getTeamById(id);
        return ResponseEntity.ok(team);
    }

    @GetMapping
    public ResponseEntity<List<Team>> getAllTeams() {
        List<Team> teams = teamService.getAllTeams();
        return ResponseEntity.ok(teams);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Team> updateTeam(@PathVariable Integer id, @RequestBody TeamDto teamDto) {
        Team updatedTeam = teamService.updateTeam(id, teamDto);
        return ResponseEntity.ok(updatedTeam);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTeam(@PathVariable Integer id) {
        teamService.deleteTeam(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{teamId}/users")
    public ResponseEntity<List<UserDto>> getUsersInTeam(@PathVariable Integer teamId) {
        var users = teamService.getUsersInTeam(teamId); // This should return a Set<User> or List<User>
        var userDto = users.stream()
                .map(user -> new UserDto((long) user.getId(), user.getEmail(), user.getFullName())) // Adjust `getFullName()` if necessary
                .toList();
        return ResponseEntity.ok(userDto);

    }

}
