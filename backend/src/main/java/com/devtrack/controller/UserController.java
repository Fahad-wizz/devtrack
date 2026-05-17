package com.devtrack.controller;

import com.devtrack.dto.UserResponse;
import com.devtrack.service.UserService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public UserResponse profile(Authentication authentication) {
        return userService.getProfile(authentication);
    }

    @GetMapping
    public List<UserResponse> users() {
        return userService.findAllUsers();
    }
}
