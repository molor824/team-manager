package com.example.teammanager.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.lang.NonNull;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Table(name = "users")
@Entity
@Data
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private int id;

    @Column(name = "full_name", length = 100, nullable = false)
    @NonNull
    @Setter
    @Getter
    private String fullName;

    @Column(name = "email", unique = true, length = 100, nullable = false)
    @NonNull
    @Setter
    @Getter
    private String email;

    @Column(name = "password", nullable = false)
    @NonNull
    @Setter
    private String password;

    @Column(name = "phone_number")
    @Setter
    @Getter
    private String phoneNumber;

    @CreationTimestamp
    @Column(updatable = false, name = "created_at")
    @Getter
    private Date createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    @Getter
    private Date updatedAt;


    @ManyToMany(mappedBy = "users", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private Set<Team> teams = new HashSet<>();

    public User() {
        // No-argument constructor
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public @NonNull String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }
}
