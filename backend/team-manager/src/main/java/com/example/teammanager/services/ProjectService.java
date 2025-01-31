package com.example.teammanager.services;

import com.example.teammanager.dtos.ProjectDto;
import com.example.teammanager.entities.Project;
import com.example.teammanager.entities.ProjectMemberRelation;
import com.example.teammanager.entities.User;
import com.example.teammanager.exception.ProjectExistException;
import com.example.teammanager.exception.ProjectNotFoundException;
import com.example.teammanager.exception.UnauthorizedMemberException;
import com.example.teammanager.repositories.ProjectRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@AllArgsConstructor
@Service
@Transactional
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final UserService userService;
    private final ProjectMemberService projectMemberService;
    private final WorkService workService;

    public Project createProject(ProjectDto projectDto) {
        if (projectRepository.existsByName(projectDto.name())) {
            throw ProjectExistException.withName(projectDto.name());
        }

        var currentUser = userService.getCurrentUser();

        var project = new Project();
        project.setName(projectDto.name());
        project.setDescription(projectDto.description());
        project.setAdmin(currentUser);
        project = projectRepository.save(project);

        projectMemberService.addRelation(project, currentUser);

        return project;
    }

    public List<Project> getAllProjects() {
        var currentUser = userService.getCurrentUser();
        return projectMemberService.getAllRelationsByMember(currentUser).stream().map(
                ProjectMemberRelation::getProject
        ).toList();
    }

    @Transactional
    public Project getMemberProjectById(Long id) {
        var currentUser = userService.getCurrentUser();
        var project = projectRepository.findById(id).orElseThrow(() ->
                ProjectNotFoundException.withId(id)
        );
        if (!projectMemberService.memberExist(project, currentUser)) {
            throw ProjectNotFoundException.withId(id);
        }
        return project;
    }

    @Transactional
    public Project getAdminProjectById(Long id) {
        var currentUser = userService.getCurrentUser();
        var project = projectRepository.findById(id).orElseThrow(() ->
                ProjectNotFoundException.withId(id)
        );
        if (!project.getAdmin().getId().equals(currentUser.getId())) {
            throw new UnauthorizedMemberException();
        }
        return project;
    }

    @Transactional
    public void deleteProject(Long id) {
        workService.deleteTasksInProject(id);

        var project = getAdminProjectById(id);
        projectMemberService.deleteProject(project);
        projectRepository.deleteById(id);
    }

    // New Methods for Managing User-Team Relationships

    public void addMemberToProject(Long projectId, Long memberId) {
        var project = getAdminProjectById(projectId);
        var member = userService.getUserById(memberId);

        projectMemberService.addRelation(project, member);
    }

    public void leaveFromProject(Long projectId, Long userId) {
        var currentUser = userService.getCurrentUser();
        var project = getMemberProjectById(projectId);
        var user = userService.getUserById(userId);

        var isAdmin = project.getAdmin().getId().equals(currentUser.getId());
        var isItself = userId.equals(currentUser.getId());

        if (isAdmin && isItself) {
            deleteProject(projectId);
        } else if (isAdmin || isItself) {
            projectMemberService.deleteRelation(project, user);
        } else {
            throw new UnauthorizedMemberException();
        }
    }

    public List<User> getMembersInProject(Long projectId) {
        var project = getMemberProjectById(projectId);
        var members = project.getMembers();
        return members.stream().map(ProjectMemberRelation::getMember).toList();
    }
}
