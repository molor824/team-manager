package com.example.teammanager.entities;

import jakarta.persistence.*;
import lombok.NonNull;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Date;
import java.util.List;

@Table(name="users")
@Entity
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private int id;

    @Column(name = "full_name", length = 100, nullable = false)
    @NonNull
    @Setter
    private String fullName;

    @Column(name = "email", unique = true, length = 100, nullable = false)
    @NonNull
    @Setter
    private String email;

    @Column(name = "password", nullable = false)
    @NonNull
    @Setter
    private String password;

    @Column(name = "phone_number")
    @Setter
    private String phoneNumber;

    @CreationTimestamp
    @Column(updatable = false, name = "created_at")
    private Date createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private Date updatedAt;

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
