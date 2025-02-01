package com.example.teammanager.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Table(name = "projects")
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(exclude = { "members", "admin" })
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    private Long id;

    @Column(name = "name", nullable = false, unique = true, length = 100)
    private String name;

    @Column(name = "description", nullable = false, length = 1000)
    private String description;

    @JsonIgnore
    @ToString.Exclude
    @OneToMany(mappedBy = "project")
    private Set<ProjectMemberRelation> members = new HashSet<>();

    @JsonIgnore
    @ToString.Exclude
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "admin_id")
    private User admin;

    @JsonIgnore
    @ToString.Exclude
    @OneToMany(mappedBy = "project")
    private Set<Work> works = new HashSet<>();
}
