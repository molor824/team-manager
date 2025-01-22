package com.example.teammanager.services;

import com.example.teammanager.dtos.TeamDto;
import com.example.teammanager.entities.Team;
import com.example.teammanager.entities.User;
import com.example.teammanager.repositories.TeamRepository;
import com.example.teammanager.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class TeamService {
    private final TeamRepository teamRepository;
    private final UserRepository userRepository;

    public TeamService(TeamRepository teamRepository, UserRepository userRepository) {
        this.teamRepository = teamRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public Team createTeam(TeamDto teamDto) {
        if (teamRepository.existsByName(teamDto.getName())) {
            throw new IllegalArgumentException("A team with this name already exists");
        }

        Team team = new Team();
        team.setName(teamDto.getName());
        team.setDescription(teamDto.getDescription());

        return teamRepository.save(team);
    }

    public Team getTeamById(Integer id) {
        return teamRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Team not found with ID: " + id));
    }

    public List<Team> getAllTeams() {
        return teamRepository.findAll();
    }

    @Transactional
    public Team updateTeam(Integer id, TeamDto teamDto) {
        Team team = getTeamById(id);

        team.setName(teamDto.getName());
        team.setDescription(teamDto.getDescription());

        return teamRepository.save(team);
    }

    @Transactional
    public void deleteTeam(Integer id) {
        if (!teamRepository.existsById(id)) {
            throw new IllegalArgumentException("Team not found with ID: " + id);
        }
        teamRepository.deleteById(id);
    }

    // New Methods for Managing User-Team Relationships

    @Transactional
    public Team addUserToTeam(Integer teamId, Integer userId) {
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new IllegalArgumentException("Team not found with ID: " + teamId));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));

        team.getUsers().add(user);
        user.getTeams().add(team); // Synchronize both sides of the relationship

        return teamRepository.save(team);
    }

    @Transactional
    public Team removeUserFromTeam(Integer teamId, Integer userId) {
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new IllegalArgumentException("Team not found with ID: " + teamId));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));

        team.getUsers().remove(user);
        user.getTeams().remove(team); // Synchronize both sides of the relationship

        return teamRepository.save(team);
    }

    public Set<User> getUsersInTeam(Integer teamId) {
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new IllegalArgumentException("Team not found with ID: " + teamId));
        return team.getUsers();
    }

    public Set<Team> getTeamsForUser(Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));
        return user.getTeams();
    }
}
