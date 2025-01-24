package com.example.teammanager.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

import java.util.HashSet;
import java.util.Set;

@Table(name = "teams")
@Entity
@Data
public class Team {
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
    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            name = "user_team", // Join table name
            joinColumns = @JoinColumn(name = "team_id"), // Foreign key for Team
            inverseJoinColumns = @JoinColumn(name = "user_id") // Foreign key for User
    )
    private Set<User> users = new HashSet<>();
}
