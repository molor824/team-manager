package com.example.teammanager.controllers;

import com.example.teammanager.dtos.ProjectDto;
import com.example.teammanager.dtos.ProjectResponseDto;
import com.example.teammanager.dtos.UserDto;
import com.example.teammanager.exception.StatusException;
import com.example.teammanager.services.ProjectService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RequestMapping("/api/projects")
@RestController
public class ProjectController {
    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @PostMapping
    public ProjectResponseDto createProject(@RequestBody ProjectDto projectDto) {
        return new ProjectResponseDto(projectService.createProject(projectDto));
    }

    @GetMapping("/{id}")
    public ProjectResponseDto getProjectById(@PathVariable Long id) {
        return new ProjectResponseDto(projectService.getProjectById(id));
    }

    @GetMapping
    public List<ProjectResponseDto> getAllProjects() {
        return projectService.getAllProjects().stream().map(ProjectResponseDto::new).collect(Collectors.toList());
    }

    @PutMapping("/{id}")
    public ProjectResponseDto updateProject(@PathVariable Long id, @RequestBody ProjectDto projectDto) {
        return new ProjectResponseDto(projectService.updateProject(id, projectDto));
    }

    @DeleteMapping("/{id}")
    public void deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
    }

    @DeleteMapping("/{projectId}/member/{memberId}")
    public void leaveProject(@PathVariable Long projectId, @PathVariable Long memberId) {
        projectService.removeUserFromProject(projectId, memberId);
    }

    @GetMapping("/{projectId}/users")
    public List<UserDto> getMembersInProject(@PathVariable Long projectId) {
        var users = projectService.getMembersInProject(projectId); // This should return a Set<User> or List<User>
        return users.stream().map(user -> new UserDto(user.getId(), user.getEmail(), user.getFullName())) // Adjust
                // `getFullName()`
                // if
                // necessary
                .toList();
    }
}
