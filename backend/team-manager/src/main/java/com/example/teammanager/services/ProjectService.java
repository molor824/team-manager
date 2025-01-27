package com.example.teammanager.services;

import com.example.teammanager.dtos.ProjectDto;
import com.example.teammanager.entities.Project;
import com.example.teammanager.entities.User;
import com.example.teammanager.exception.*;
import com.example.teammanager.repositories.ProjectRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@Service
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final UserService userService;

    public ProjectService(ProjectRepository projectRepository, UserService userService) {
        this.projectRepository = projectRepository;
        this.userService = userService;
    }

    @Transactional
    public Project createProject(ProjectDto projectDto) {
        var currentUser = userService.getCurrentUser();

        if (projectRepository.findByName(projectDto.name()).isPresent()) {
            throw ProjectExistException.withName(projectDto.name());
        }

        var project = new Project();
        project.setName(projectDto.name());
        project.setDescription(projectDto.description());
        project.setAdmin(currentUser);
        project.getMembers().add(currentUser);

        return projectRepository.save(project);
    }

    // public Project getProjectByName(String name) {
    // var currentUser = userService.getCurrentUser();
    // var project = projectRepository.findByName(name)
    // .orElseThrow(() -> ProjectNotFoundException.withName(name));
    // validateProjectMember(currentUser, project);
    //
    // return project;
    // }

    @Transactional(readOnly = true)
    public Project getProjectById(Long id) {
        var currentUser = userService.getCurrentUser();
        var project = projectRepository.findById(id)
                .orElseThrow(() -> ProjectNotFoundException.withId(id));
        validateProjectMember(currentUser, project);

        return project;
    }

    @Transactional(readOnly = true)
    public Set<Project> getAllProjects() {
        var currentUser = userService.getCurrentUser();
        return currentUser.getProjects();
    }

    private void validateProjectAdmin(User member, Project project) {
        if (!project.getAdmin().getId().equals(member.getId())) {
            throw new UnauthorizedMemberException();
        }
    }

    private void validateProjectMember(User member, Project project) {
        if (project.getMembers().stream().noneMatch(m -> m.getId().equals(member.getId()))) {
            throw new NotMemberException();
        }
    }

    @Transactional
    public Project updateProject(Long id, ProjectDto projectDto) {
        var currentUser = userService.getCurrentUser();
        var project = getProjectById(id);

        validateProjectAdmin(currentUser, project);

        project.setName(projectDto.name());
        project.setDescription(projectDto.description());

        return projectRepository.save(project);
    }

    @Transactional
    public void deleteProject(Long id) {
        var currentUser = userService.getCurrentUser();
        var project = getProjectById(id);
        validateProjectAdmin(currentUser, project);
        projectRepository.deleteById(id);
    }

    // New Methods for Managing User-Team Relationships

    @Transactional
    public void addMemberToProject(Long projectId, Long memberId) {
        var project = getProjectById(projectId);
        var user = userService.getUserById(memberId);
        var currentUser = userService.getCurrentUser();

        validateProjectAdmin(currentUser, project);

        project.getMembers().add(user);

        projectRepository.save(project);
    }

    @Transactional
    public void removeUserFromProject(Long projectId, Long userId) {
        var project = getProjectById(projectId);
        var user = userService.getUserById(userId);
        var currentUser = userService.getCurrentUser();

        var isAdmin = project.getAdmin().getId().equals(currentUser.getId());

        if (user.getId().equals(currentUser.getId())) {
            if (isAdmin) {
                deleteProject(projectId);
                return;
            }
            project.getMembers().remove(user);
        } else if (isAdmin) {
            project.getMembers().remove(user);
        } else {
            throw new UnauthorizedMemberException();
        }

        projectRepository.save(project);
    }

    @Transactional(readOnly = true)
    public Set<User> getMembersInProject(Long projectId) {
        return projectRepository.findById(projectId)
                .orElseThrow(() -> ProjectNotFoundException.withId(projectId)).getMembers();
    }
}
