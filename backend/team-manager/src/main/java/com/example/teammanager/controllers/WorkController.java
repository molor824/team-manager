package com.example.teammanager.controllers;

import com.example.teammanager.dtos.WorkDto;
import com.example.teammanager.services.WorkService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/work")
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

    @DeleteMapping("/project/{projectId}/{taskId}")
    public void deleteWork(@PathVariable Long projectId, @PathVariable Long taskId) {
        workService.deleteWorkByProjectAndId(projectId, taskId);
    }
}
