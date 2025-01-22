package com.example.teammanager.services;

import com.example.teammanager.dtos.TeamDto;
import com.example.teammanager.entities.Team;
import com.example.teammanager.repositories.TeamRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeamService {
    private final TeamRepository teamRepository;

    public TeamService(TeamRepository teamRepository) {
        this.teamRepository = teamRepository;
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
}
