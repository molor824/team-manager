package com.example.teammanager.configs;

import com.example.teammanager.repositories.UserRepository;
import com.example.teammanager.services.UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
public class ApplicationConfiguration {
    private final UserService userService;

    public ApplicationConfiguration(UserService userService) {
        this.userService = userService;
    }

    @Bean
    UserDetailsService userDetailsService() {
        return userService::findByEmailOrNotFound;
    }

    @Bean
    BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    AuthenticationProvider authenticationProvider() {
        var authenticationProvider = new DaoAuthenticationProvider();

        authenticationProvider.setUserDetailsService(userDetailsService());
        authenticationProvider.setPasswordEncoder(passwordEncoder());

        return authenticationProvider;
    }
}
