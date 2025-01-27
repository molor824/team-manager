package com.example.teammanager.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
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
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "full_name", length = 100, nullable = false)
    @NotBlank
    private String fullName;

    @Column(name = "email", unique = true, length = 100, nullable = false)
    @NotBlank
    private String email;

    @Column(name = "password", nullable = false, length = 400)
    @NotBlank
    private String password;

    @Column(name = "phone_number", length = 20)
    private String phoneNumber;

    @CreationTimestamp
    @Column(updatable = false, name = "created_at", nullable = false)
    private Date createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private Date updatedAt;

    @JsonIgnore
    @ManyToMany(mappedBy = "members")
    private Set<Project> projects = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "admin")
    private Set<Project> adminProjects = new HashSet<>();

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
