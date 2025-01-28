package com.example.teammanager.services;

import com.example.teammanager.entities.Project;
import com.example.teammanager.entities.ProjectMemberRelation;
import com.example.teammanager.entities.ProjectMemberRelationKey;
import com.example.teammanager.entities.User;
import com.example.teammanager.repositories.ProjectMemberRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@AllArgsConstructor
@Service
@Transactional
public class ProjectMemberService {
    private final ProjectMemberRepository projectMemberRepository;

    public Set<ProjectMemberRelation> getAllRelationsByProject(Project project) {
        return projectMemberRepository.findAllByProjectId(project.getId());
    }
    public Set<ProjectMemberRelation> getAllRelationsByMember(User member) {
        return projectMemberRepository.findAllByMemberId(member.getId());
    }

    public void addRelation(Project project, User member) {
        var relation = new ProjectMemberRelation();
        relation.setId(new ProjectMemberRelationKey(member.getId(), project.getId()));
        relation.setProject(project);
        relation.setMember(member);
        projectMemberRepository.save(relation);
    }

    public void deleteRelation(Project project, User member) {
        projectMemberRepository.deleteById(
                new ProjectMemberRelationKey(project.getId(), member.getId())
        );
    }

    public void deleteProject(Project project) {
        var projects = projectMemberRepository.findAllByProjectId(project.getId());
        projectMemberRepository.deleteAll(projects);
    }

    public boolean memberExist(Project project, User member) {
        return projectMemberRepository.existsById(
                new ProjectMemberRelationKey(project.getId(), member.getId())
        );
    }
}
