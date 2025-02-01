package com.example.teammanager.controllers;

import com.example.teammanager.dtos.WorkDto;
import com.example.teammanager.services.WorkService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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

    @GetMapping("/user/{userId}")
    public List<WorkDto> getWorkByAssignedUserId(@PathVariable Long userId) {
        return workService.getWorkByAssignedUserId(userId);
    }

    @PostMapping
    public WorkDto createWork(@RequestBody WorkDto dto) {
        return workService.createWork(dto);
    }
    @PutMapping("/{taskId}/project/{projectId}/assign")
    public WorkDto assignUserToTask(@PathVariable Long taskId, @PathVariable Long projectId, @RequestBody Map<String, Long> body) {
        Long userId = body.get("userId");
        return workService.assignUserToTask(taskId, projectId, userId);
    }

    @DeleteMapping("/{taskId}/project/{projectId}")
    public void deleteWork(@PathVariable Long taskId, @PathVariable Long projectId) {
        workService.deleteWorkByProjectAndId(projectId, taskId);
    }
}
