package com.example.teammanager.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Embeddable
public class ProjectMemberRelationKey implements Serializable {
    @Column(name = "project_id")
    private Long projectId;
    @Column(name = "member_id")
    private Long memberId;
}
