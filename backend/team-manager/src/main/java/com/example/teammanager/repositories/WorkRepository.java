package com.example.teammanager.repositories;

import com.example.teammanager.entities.Work;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WorkRepository extends JpaRepository<Work, Long> {
    List<Work> findByProjectId(Long projectId);
    List<Work> findByAssignedUserId(Long userId);

    Optional<Work> findByIdAndProjectId(Long taskId, Long projectId);


}
