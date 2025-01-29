package com.example.teammanager.controllers;

import com.example.teammanager.dtos.WorkDto;
import com.example.teammanager.services.WorkService;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<List<WorkDto>> getWorkByProjectId(@PathVariable Long projectId) {
        return ResponseEntity.ok(workService.getWorkByProjectId(projectId));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<WorkDto>> getWorkByAssignedUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(workService.getWorkByAssignedUserId(userId));
    }

    @PostMapping
    public ResponseEntity<WorkDto> createWork(@RequestBody WorkDto dto) {
        return ResponseEntity.ok(workService.createWork(dto));
    }

    @DeleteMapping("/project/{projectId}/{taskId}")
    public ResponseEntity<Void> deleteWork(@PathVariable Long projectId, @PathVariable Long taskId) {
        workService.deleteWorkByProjectAndId(projectId, taskId);
        return ResponseEntity.noContent().build();
    }
}
