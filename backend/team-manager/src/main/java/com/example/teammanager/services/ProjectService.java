package com.example.teammanager.services;

import com.example.teammanager.dtos.ProjectDto;
import com.example.teammanager.entities.Project;
import com.example.teammanager.entities.User;
import com.example.teammanager.exception.*;
import com.example.teammanager.repositories.ProjectRepository;
import com.example.teammanager.repositories.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@Transactional
@Service
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final UserService userService;

    public ProjectService(ProjectRepository projectRepository, UserRepository userRepository, UserService userService) {
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
        this.userService = userService;
    }

    public Project createProject(ProjectDto projectDto) throws StatusException {
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

    // public Project getProjectByName(String name)
    // throws ProjectNotFoundException, UserNotFoundException, NotMemberException {
    // var currentUser = userService.getCurrentUser();
    // var project = projectRepository.findByName(name)
    // .orElseThrow(() -> ProjectNotFoundException.withName(name));
    // validateProjectMember(currentUser, project);
    //
    // return project;
    // }

    public Project getProjectById(Long id) throws StatusException {
        var currentUser = userService.getCurrentUser();
        var project = projectRepository.findById(id)
                .orElseThrow(() -> ProjectNotFoundException.withId(id));
        validateProjectMember(currentUser, project);

        return project;
    }

    public Set<Project> getAllProjects() throws StatusException {
        var currentUser = userService.getCurrentUser();
        return currentUser.getProjects();
    }

    private void validateProjectAdmin(User member, Project project) throws StatusException {
        if (!project.getAdmin().getId().equals(member.getId())) {
            throw new UnauthorizedMemberException();
        }
    }

    private void validateProjectMember(User member, Project project) throws StatusException {
        if (project.getMembers().stream().noneMatch(m -> m.getId().equals(member.getId()))) {
            throw new NotMemberException();
        }
    }

    public Project updateProject(Long id, ProjectDto projectDto) throws StatusException {
        var currentUser = userService.getCurrentUser();
        var project = getProjectById(id);

        validateProjectAdmin(currentUser, project);

        project.setName(projectDto.name());
        project.setDescription(projectDto.description());

        return projectRepository.save(project);
    }

    public void deleteProject(Long id) throws StatusException {
        var currentUser = userService.getCurrentUser();
        var project = getProjectById(id);
        validateProjectAdmin(currentUser, project);
        projectRepository.deleteById(id);
    }

    // New Methods for Managing User-Team Relationships

    public void addMemberToProject(Long projectId, Long memberId) throws StatusException {
        var project = getProjectById(projectId);
        var user = userService.getUserById(memberId);
        var currentUser = userService.getCurrentUser();

        validateProjectAdmin(currentUser, project);

        project.getMembers().add(user);

        projectRepository.save(project);
    }

    public void removeUserFromProject(Long projectId, Long userId) throws StatusException {
        var project = getProjectById(projectId);
        var user = userService.getUserById(userId);
        var currentUser = userService.getCurrentUser();

        var isAdmin = project.getAdmin() == currentUser;

        if (user == currentUser) {
            if (isAdmin) {
                deleteProject(projectId);
            } else {
                project.getMembers().remove(user);
            }
        } else if (isAdmin) {
            project.getMembers().remove(user);
        } else {
            throw new UnauthorizedMemberException();
        }

        projectRepository.save(project);
    }

    public Set<User> getMembersInProject(Long projectId)
            throws StatusException {
        return projectRepository.findById(projectId)
                .orElseThrow(() -> ProjectNotFoundException.withId(projectId)).getMembers();
    }
}
