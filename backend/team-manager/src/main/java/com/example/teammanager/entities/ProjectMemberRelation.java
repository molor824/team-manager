package com.example.teammanager.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "project_member_rel")
public class ProjectMemberRelation {
    @EmbeddedId
    private ProjectMemberRelationKey id;

    @ManyToOne(fetch = FetchType.EAGER)
    @MapsId("projectId")
    @JoinColumn(name = "project_id")
    private Project project;

    @ManyToOne(fetch = FetchType.EAGER)
    @MapsId("memberId")
    @JoinColumn(name = "member_id")
    private User member;
}
