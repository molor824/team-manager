//package com.example.teammanager;
//
//import com.example.teammanager.controllers.AuthenticationController;
//import com.example.teammanager.controllers.TeamController;
//import com.example.teammanager.dtos.LoginUserDto;
//import com.example.teammanager.dtos.RegisterUserDto;
//import com.example.teammanager.dtos.TeamDto;
//import com.example.teammanager.dtos.UserDto;
//import com.example.teammanager.services.TeamService;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//
//import java.io.IOException;
//import java.util.List;
//
//@SpringBootTest
//class TeamManagerApplicationTests {
//    @Autowired
//    private AuthenticationController authenticationController;
//
//    @Autowired
//    private TeamController teamController;
//
//    @Autowired
//    private TeamService teamService;
//
//    @Test
//    void testAuthentication() {
//        // Test user registration
//        assert authenticationController != null;
//        var response = authenticationController.signup(new RegisterUserDto(
//                "test@mail.com",
//                "Tester John",
//                "test_password_123",
//                null));
//        assert response != null;
//
//        // Test user login
//        var response1 = authenticationController.login(new LoginUserDto(
//                "test@mail.com",
//                "test_password_123"));
//        assert response1 != null;
//    }
//
//    @Test
//    void testTeamCreationAndUserAssignment() throws IOException {
//        // Create a new team
//        TeamDto teamDto = new TeamDto();
//        teamDto.setName("Test Team");
//        teamDto.setDescription("This is a test team.");
//
//        var createdTeam = teamService.createTeam(teamDto);
//        assert createdTeam != null;
//        assert createdTeam.getName().equals("Test Team");
//        assert createdTeam.getDescription().equals("This is a test team.");
//
//        // Add a user to the team
//        var userResponse = authenticationController.signup(new RegisterUserDto(
//                "user1@mail.com",
//                "User One",
//                "user_password_123",
//                null));
//        assert userResponse != null;
//
//        var user = userResponse.getBody();
//        assert false;
//
//        var addedTeam = teamService.addUserToTeam(createdTeam.getId(), user.getId());
//        assert addedTeam != null;
//        assert addedTeam.getUsers().size() == 1;
//
//        // Check users in the team
//        var usersInTeamResponse = teamController.getUsersInTeam(createdTeam.getId());
//        assert usersInTeamResponse != null;
//
//        List<UserDto> usersInTeam = usersInTeamResponse.getBody();
//        assert usersInTeam != null; // Ensure the list is not null
//        assert usersInTeam.size() == 1; // There should be exactly 1 user in the team
//
//        UserDto userDto = usersInTeam.get(0); // Get the first user in the team
//        assert userDto.getEmail().equals("user1@mail.com"); // Verify the email
//        assert userDto.getName().equals("User One"); // Verify the name
//
//        // Remove the user from the team
//        var updatedTeam = teamService.removeUserFromTeam(createdTeam.getId(), userDto.getId().intValue());
//        assert updatedTeam != null; // Ensure the team was updated successfully
//        assert updatedTeam.getUsers().isEmpty(); // Verify that the team has no users
//    }
//}