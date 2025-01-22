package com.example.teammanager.repositories;

import com.example.teammanager.entities.UserTeamRel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserTeamRelRepository extends JpaRepository<UserTeamRel, Integer> {
}
