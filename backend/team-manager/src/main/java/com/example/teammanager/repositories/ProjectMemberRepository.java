package com.example.teammanager.repositories;

import com.example.teammanager.entities.ProjectMemberRelation;
import com.example.teammanager.entities.ProjectMemberRelationKey;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface ProjectMemberRepository extends JpaRepository<ProjectMemberRelation, ProjectMemberRelationKey> {
    Page<ProjectMemberRelation> findAllByProjectId(Long projectId, Pageable pageable);
    Set<ProjectMemberRelation> findAllByProjectId(Long projectId);
    Page<ProjectMemberRelation> findAllByMemberId(Long memberId, Pageable pageable);
    Set<ProjectMemberRelation> findAllByMemberId(Long memberId);
}
