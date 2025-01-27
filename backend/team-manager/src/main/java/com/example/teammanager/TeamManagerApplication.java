package com.example.teammanager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableTransactionManagement
public class TeamManagerApplication {

    public static void main(String[] args) {
        SpringApplication.run(TeamManagerApplication.class, args);
    }

}
