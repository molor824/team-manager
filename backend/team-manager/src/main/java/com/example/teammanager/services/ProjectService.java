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

    @Transactional
    public Project createProject(ProjectDto projectDto) throws UserNotFoundException, ProjectExistException {
        var currentUser = userService.getCurrentUser();

        if (projectRepository.findByName(projectDto.name()).isPresent()) {
            throw ProjectExistException.withName(projectDto.name());
        }

        var project = new Project();
        project.setName(projectDto.name());
        project.setDescription(projectDto.description());
        project.setAdmin(currentUser);
        project = projectRepository.save(project);

        currentUser.getProjects().add(project);
        project.getMembers().add(currentUser);

        return project;
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

    public Project getProjectById(Long id)
            throws ProjectNotFoundException, UserNotFoundException, NotMemberException {
        var currentUser = userService.getCurrentUser();
        var project = projectRepository.findById(id)
                .orElseThrow(() -> ProjectNotFoundException.withId(id));
        validateProjectMember(currentUser, project);

        return project;
    }

    public Set<Project> getAllProjects() throws UserNotFoundException {
        var currentUser = userService.getCurrentUser();
        return currentUser.getProjects();
    }

    private void validateProjectAdmin(User member, Project project) throws UnauthorizedMemberException {
        if (project.getAdmin() != member) {
            throw new UnauthorizedMemberException();
        }
    }

    private void validateProjectMember(User member, Project project) throws NotMemberException {
        if (!project.getMembers().contains(member)) {
            throw new NotMemberException();
        }
    }

    @Transactional
    public Project updateProject(Long id, ProjectDto projectDto)
            throws UserNotFoundException, UnauthorizedMemberException, ProjectNotFoundException, NotMemberException {
        var currentUser = userService.getCurrentUser();
        var project = getProjectById(id);

        validateProjectAdmin(currentUser, project);

        project.setName(projectDto.name());
        project.setDescription(projectDto.description());

        return projectRepository.save(project);
    }

    @Transactional
    public void deleteProject(Long id)
            throws ProjectNotFoundException, UserNotFoundException, UnauthorizedMemberException, NotMemberException {
        var currentUser = userService.getCurrentUser();
        var project = getProjectById(id);
        validateProjectAdmin(currentUser, project);
        projectRepository.deleteById(id);
    }

    // New Methods for Managing User-Team Relationships

    @Transactional
    public void addMemberToProject(Long projectId, Long memberId)
            throws ProjectNotFoundException, UserNotFoundException, UnauthorizedMemberException, NotMemberException {
        var team = getProjectById(projectId);
        var user = userService.getUserById(memberId);
        var currentUser = userService.getCurrentUser();

        validateProjectAdmin(currentUser, team);

        team.getMembers().add(user);
        user.getProjects().add(team);

        userRepository.save(user);
        projectRepository.save(team);
    }

    @Transactional
    public void removeUserFromProject(Long projectId, Long userId)
            throws ProjectNotFoundException, UserNotFoundException, UnauthorizedMemberException, NotMemberException {
        var project = getProjectById(projectId);
        var user = userService.getUserById(userId);
        var currentUser = userService.getCurrentUser();

        var isAdmin = project.getAdmin() == currentUser;

        if (user == currentUser) {
            if (isAdmin) {
                deleteProject(projectId);
            } else {
                currentUser.getProjects().remove(project);
                project.getMembers().remove(user);
            }
        } else if (isAdmin) {
            user.getProjects().remove(project);
            project.getMembers().remove(user);
        } else {
            throw new UnauthorizedMemberException();
        }

        userRepository.save(user);
        projectRepository.save(project);
    }

    public Set<User> getMembersInProject(Long projectId)
            throws ProjectNotFoundException {
        return projectRepository.findById(projectId)
                .orElseThrow(() -> ProjectNotFoundException.withId(projectId)).getMembers();
    }
}
