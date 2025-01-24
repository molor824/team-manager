package com.example.teammanager.repositories;

import com.example.teammanager.entities.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeamRepository extends JpaRepository<Team, Integer> {
    boolean existsByName(String name);
}
