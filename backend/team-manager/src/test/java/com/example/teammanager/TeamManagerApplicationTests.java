package com.example.teammanager;

import com.example.teammanager.controllers.AuthenticationController;
import com.example.teammanager.controllers.UserController;
import com.example.teammanager.dtos.LoginUserDto;
import com.example.teammanager.dtos.RegisterUserDto;
import com.example.teammanager.dtos.ProjectDto;
import com.example.teammanager.services.ProjectService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class TeamManagerApplicationTests {
    @Autowired
    private AuthenticationController authenticationController;

    @Autowired
    private ProjectService projectService;

    @Autowired
    private UserController userController;

    @Test
    void testAuthentication() {
        // Test user registration
        assert authenticationController != null;
        var response = authenticationController.signup(new RegisterUserDto(
                "test@mail.com",
                "Tester John",
                "test_password_123",
                null));
        assert response != null;

        // Test user login
        var response1 = authenticationController.login(new LoginUserDto(
                "test@mail.com",
                "test_password_123"));
        assert response1 != null;

        // Test authorization
        var response2 = userController.authenticatedUser();
        assert response2 != null;
        assert response2.email().equals("test@mail.com");
    }

    @Test
    void testProjectCreation() {
        // Add a user to the team
        var memberResponse = authenticationController.signup(new RegisterUserDto(
                "user1@mail.com",
                "User One",
                "user_password_123",
                null
        ));

        // sign up
        authenticationController.signup(new RegisterUserDto(
                "admin@mail.com",
                "Admin User",
                "admin_password_123",
                null
        ));

        // Create a new project
        ProjectDto projectDto = new ProjectDto("Test project", "This is a test project.");
        var projectResponse = projectService.createProject(projectDto);

        projectService.addMemberToProject(projectResponse.getId(), memberResponse.id());

        var membersResponse = projectService.getMembersInProject(projectResponse.getId());
        assert membersResponse.size() == 2;
    }
}