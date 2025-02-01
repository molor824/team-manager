package com.example.teammanager.services;

import com.example.teammanager.dtos.WorkDto;
import com.example.teammanager.entities.Project;
import com.example.teammanager.entities.User;
import com.example.teammanager.entities.Work;
import com.example.teammanager.exception.TaskNotFoundException;
import com.example.teammanager.exception.UnauthorizedMemberException;
import com.example.teammanager.exception.UserNotFoundException;
import com.example.teammanager.repositories.ProjectRepository;
import com.example.teammanager.repositories.UserRepository;
import com.example.teammanager.repositories.WorkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class WorkService {
    private final WorkRepository workRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final UserService userService;
    private ProjectService projectService;

    @Autowired
    public WorkService(
            WorkRepository workRepository,
            ProjectRepository projectRepository,
            UserRepository userRepository,
            UserService userService,
            @Lazy ProjectService projectService
    ) {
        this.workRepository = workRepository;
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
        this.userService = userService;
        this.projectService = projectService;
    }

    public List<WorkDto> getWorkByProjectId(Long projectId) {
        projectService.getMemberProjectById(projectId);
        return workRepository.findByProjectId(projectId).stream().map(this::toDto).toList();
    }

    public List<WorkDto> getAssignedWorkByProjectId(Long projectId) {
        var currentUser = userService.getCurrentUser();
        return workRepository.findByProjectId(projectId).stream()
                .filter(work -> work.getAssignedUser() != null && work.getAssignedUser().getId().equals(currentUser.getId()))
                .map(this::toDto).toList();
    }

    public List<WorkDto> getWorkByAssignedUserId(Long userId) {
        return workRepository.findByAssignedUserId(userId).stream().map(this::toDto).collect(Collectors.toList());
    }

    private Work getWorkInProjectById(Project project, Long workId) {
        var work = workRepository.findById(workId).orElseThrow(TaskNotFoundException::new);
        if (!work.getProject().getId().equals(project.getId())) {
            throw new TaskNotFoundException();
        }

        return work;
    }

    public WorkDto createWork(WorkDto dto) {
        Project project = projectRepository.findById(dto.projectId())
                .orElseThrow(() -> new RuntimeException("Project not found"));

        User assignedUser = null;
        if (dto.assignedUserId() != null) {
            assignedUser = userRepository.findById(dto.assignedUserId())
                    .orElseThrow(() -> new UserNotFoundException("User not found"));
        }

        Work work = new Work(null, dto.title(), dto.description(), dto.status(), project, assignedUser);
        return toDto(workRepository.save(work));
    }

    public void deleteWorkByProjectAndId(Long projectId, Long taskId) {
        var project = projectService.getAdminProjectById(projectId);
        var work = getWorkInProjectById(project, taskId);
        workRepository.delete(work);
    }

    @Transactional
    public void deleteTasksInProject(Long id) {
        var project = projectService.getAdminProjectById(id);
        var works = project.getWorks();
        workRepository.deleteAll(works);
    }

    @Transactional
    public void editStatus(Long workId, Long projectId, String status) {
        var user = userService.getCurrentUser();
        var project = projectService.getMemberProjectById(projectId);
        var work = getWorkInProjectById(project, workId);
        if (
                !project.getAdmin().getId().equals(user.getId())
                && !work.getAssignedUser().getId().equals(user.getId())
        ) throw new UnauthorizedMemberException();
        work.setStatus(status);
        workRepository.save(work);
    }

    private WorkDto toDto(Work work) {
        var user = work.getAssignedUser();
        return new WorkDto(
                work.getId(),
                work.getTitle(),
                work.getDescription(),
                work.getStatus(),
                work.getProject().getId(),
                user != null ? user.getId() : null
        );
    }
    @Transactional
    public WorkDto assignUserToTask(Long taskId, Long projectId, Long userId) {
        var project = projectService.getAdminProjectById(projectId);
        var work = getWorkInProjectById(project, taskId);
        var user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        work.setAssignedUser(user);
        workRepository.save(work);

        return toDto(work);
    }
}
