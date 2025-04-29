package com.example.user_management.controller;

import com.example.user_management.dto.UserDto;
import com.example.user_management.model.User;
import com.example.user_management.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }

    @PutMapping("/{id}/activate")
    public User activateUser(@PathVariable Long id) {
        return userService.activateUser(id);
    }

    @PutMapping("/{id}/deactivate")
    public User deactivateUser(@PathVariable Long id) {
        return userService.deactivateUser(id);
    }

    @GetMapping("/type/{type}")
    public List<User> getUsersByType(@PathVariable String type) {
        return userService.getUsersByType(type);
    }

    @GetMapping("/status/{active}")
    public List<User> getUsersByActivationStatus(@PathVariable boolean active) {
        return userService.getUsersByActivationStatus(active);
    }
}
