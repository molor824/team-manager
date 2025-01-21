package com.example.teammanager;

import com.example.teammanager.controllers.AuthenticationController;
import com.example.teammanager.dtos.LoginUserDto;
import com.example.teammanager.dtos.RegisterUserDto;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class TeamManagerApplicationTests {
    @Autowired
    private AuthenticationController authenticationController;

    @Test
    void testAuthentication() {
        assert authenticationController != null;
        var response = authenticationController.signup(new RegisterUserDto(
                "test@mail.com",
                "Tester John",
                "test_password_123",
                null));
        assert response != null;

        var response1 = authenticationController.login(new LoginUserDto(
                "test@mail.com",
                "test_password_123"));
        assert response1 != null;
    }
}
