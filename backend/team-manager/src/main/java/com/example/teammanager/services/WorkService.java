package com.example.teammanager.services;

import com.example.teammanager.dtos.WorkDto;
import com.example.teammanager.entities.Project;
import com.example.teammanager.entities.User;
import com.example.teammanager.entities.Work;
import com.example.teammanager.exception.UserNotFoundException;
import com.example.teammanager.repositories.ProjectRepository;
import com.example.teammanager.repositories.UserRepository;
import com.example.teammanager.repositories.WorkRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class WorkService {
    private final WorkRepository workRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    public List<WorkDto> getWorkByProjectId(Long projectId) {
        return workRepository.findByProjectId(projectId).stream().map(this::toDto).collect(Collectors.toList());
    }

    public List<WorkDto> getWorkByAssignedUserId(Long userId) {
        return workRepository.findByAssignedUserId(userId).stream().map(this::toDto).collect(Collectors.toList());
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
        Work work = workRepository.findByIdAndProjectId(taskId, projectId)
                .orElseThrow(() -> new RuntimeException("Work not found"));
        workRepository.delete(work);
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
}
