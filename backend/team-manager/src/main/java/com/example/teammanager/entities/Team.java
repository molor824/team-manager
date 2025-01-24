package com.example.teammanager.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true)
    private String name;

    private String description;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            name = "user_team", // Join table name
            joinColumns = @JoinColumn(name = "team_id"), // Foreign key for Team
            inverseJoinColumns = @JoinColumn(name = "user_id") // Foreign key for User
    )
    private Set<User> users = new HashSet<>();
}
