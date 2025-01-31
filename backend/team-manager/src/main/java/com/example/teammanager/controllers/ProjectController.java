package com.example.teammanager.controllers;

import com.example.teammanager.dtos.ProjectDto;
import com.example.teammanager.dtos.ProjectResponseDto;
import com.example.teammanager.dtos.WorkDto;
import com.example.teammanager.entities.Project;
import com.example.teammanager.entities.ProjectMemberRelation;
import com.example.teammanager.services.ProjectService;
import com.example.teammanager.services.WorkService;
import lombok.AllArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/projects")
@RestController
@AllArgsConstructor
public class ProjectController {
    private final ProjectService projectService;
    private final WorkService workService;

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
                project.getAdmin().getId(),
                workService.getWorkByProjectId(project.getId())
        );
    }

    @GetMapping
    public List<Project> getAllProjects() {
        return projectService.getAllProjects();
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
