package com.apibackserver.backend_api.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;
import com.apibackserver.backend_api.dto.UserDto;
import com.apibackserver.backend_api.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<UserDto> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public UserDto getUserById(@PathVariable String id) {
        return userService.getUserById(id);
    }
}
