package com.example.teammanager.controllers;

import com.example.teammanager.dtos.WorkDto;
import com.example.teammanager.exception.InvalidQueryException;
import com.example.teammanager.services.WorkService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/works")
public class WorkController {
    private final WorkService workService;

    public WorkController(WorkService workService) {
        this.workService = workService;
    }

    @GetMapping("/project/{projectId}")
    public List<WorkDto> getWorkByProjectId(@PathVariable Long projectId) {
        return workService.getWorkByProjectId(projectId);
    }

    @GetMapping("/project/{projectId}/assigned")
    public List<WorkDto> getAssignedWorkByProjectId(@PathVariable Long projectId) {
        return workService.getAssignedWorkByProjectId(projectId);
    }

    @GetMapping("/user/{userId}")
    public List<WorkDto> getWorkByAssignedUserId(@PathVariable Long userId) {
        return workService.getWorkByAssignedUserId(userId);
    }

    @PostMapping
    public WorkDto createWork(@RequestBody WorkDto dto) {
        return workService.createWork(dto);
    }

    @PutMapping("/{workId}/project/{projectId}/assign")
    public WorkDto assignUserToTask(@PathVariable Long workId, @PathVariable Long projectId, @RequestParam String v) {
        try {
            return workService.assignUserToTask(workId, projectId, Long.parseUnsignedLong(v));
        } catch (NumberFormatException e) {
            throw new InvalidQueryException();
        }
    }

    @PutMapping("/{workId}/project/{projectId}/status")
    public void editWorkStatus(@PathVariable Long workId, @PathVariable Long projectId, @RequestParam String v) {
        workService.editStatus(workId, projectId, v);
    }

    @DeleteMapping("/{workId}/project/{projectId}")
    public void deleteWork(@PathVariable Long workId, @PathVariable Long projectId) {
        workService.deleteWorkByProjectAndId(projectId, workId);
    }
}
