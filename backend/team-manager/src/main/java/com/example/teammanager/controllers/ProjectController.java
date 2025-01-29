package com.example.teammanager.controllers;

import com.example.teammanager.dtos.ProjectDto;
import com.example.teammanager.dtos.ProjectResponseDto;
import com.example.teammanager.entities.Project;
import com.example.teammanager.entities.ProjectMemberRelation;
import com.example.teammanager.entities.User;
import com.example.teammanager.services.ProjectService;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/projects")
@RestController
public class ProjectController {
    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @PostMapping
    public Project createProject(@RequestBody ProjectDto projectDto) {
        return projectService.createProject(projectDto);
    }

    @GetMapping("/{id}")
    @Transactional
    public ProjectResponseDto getProjectById(@PathVariable Long id) {
        var project = projectService.getMemberProjectById(id);
        return new ProjectResponseDto(
                project.getId(),
                project.getName(),
                project.getDescription(),
                project.getMembers().stream().map(ProjectMemberRelation::getMember).toList(),
                project.getAdmin().getId()
        );
    }

    @GetMapping
    public List<Project> getAllProjects() {
        return projectService.getAllProjects();
    }

    @PutMapping("/{id}")
    public Project updateProject(@PathVariable Long id, @RequestBody ProjectDto projectDto) {
        return projectService.updateProject(id, projectDto);
    }

    @DeleteMapping("/{id}")
    public void deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
    }

    @DeleteMapping("/{projectId}/member/{memberId}")
    public void leaveProject(@PathVariable Long projectId, @PathVariable Long memberId) {
        projectService.leaveFromProject(projectId, memberId);
    }
}
