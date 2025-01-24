package com.example.teammanager.services;

import com.example.teammanager.dtos.TeamDto;
import com.example.teammanager.entities.Team;
import com.example.teammanager.entities.User;
import com.example.teammanager.exception.TeamExistException;
import com.example.teammanager.exception.TeamNotFoundException;
import com.example.teammanager.exception.UserNotFoundException;
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

    public Team createTeam(TeamDto teamDto) throws TeamExistException {
        if (teamRepository.existsByName(teamDto.name())) {
            throw TeamExistException.withName(teamDto.name());
        }

        Team team = new Team();
        team.setName(teamDto.name());
        team.setDescription(teamDto.description());

        return teamRepository.save(team);
    }

    public Team getTeamById(Long id) throws TeamNotFoundException {
        return teamRepository.findById(id)
                .orElseThrow(() -> TeamNotFoundException.withId(id));
    }

    public List<Team> getAllTeams() {
        return teamRepository.findAll();
    }

    @Transactional
    public Team updateTeam(Long id, TeamDto teamDto) {
        Team team = getTeamById(id);

        team.setName(teamDto.name());
        team.setDescription(teamDto.description());

        return teamRepository.save(team);
    }

    @Transactional
    public void deleteTeam(Long id) throws TeamNotFoundException {
        if (!teamRepository.existsById(id)) {
            throw TeamNotFoundException.withId(id);
        }
        teamRepository.deleteById(id);
    }

    // New Methods for Managing User-Team Relationships

    @Transactional
    public Team addUserToTeam(Long teamId, Long userId)
            throws TeamNotFoundException, UserNotFoundException {
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> TeamNotFoundException.withId(teamId));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> UserNotFoundException.withId(userId));

        team.getUsers().add(user);
        user.getTeams().add(team); // Synchronize both sides of the relationship

        return teamRepository.save(team);
    }

    @Transactional
    public Team removeUserFromTeam(Long teamId, Long userId)
            throws TeamNotFoundException, UserNotFoundException {
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> TeamNotFoundException.withId(teamId));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> UserNotFoundException.withId(userId));

        team.getUsers().remove(user);
        user.getTeams().remove(team); // Synchronize both sides of the relationship

        return teamRepository.save(team);
    }

    public Set<User> getUsersInTeam(Long teamId)
            throws TeamNotFoundException {
        return teamRepository.findById(teamId)
                .orElseThrow(() -> TeamNotFoundException.withId(teamId)).getUsers();
    }

    public Set<Team> getTeamsForUser(Long userId)
            throws UserNotFoundException {
        return userRepository.findById(userId)
                .orElseThrow(() -> UserNotFoundException.withId(userId)).getTeams();
    }
}
