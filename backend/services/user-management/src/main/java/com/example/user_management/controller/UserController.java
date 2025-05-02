package com.example.user_management.controller;


import com.example.user_management.model.User;
import com.example.user_management.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {


    @Autowired
    private HttpServletRequest request;

    private final UserService userService;

    @GetMapping
    public List<User> getAllUsers() {
        //checkAdminAccess();
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



    @GetMapping("/counts")
    public Map<String, Long> getUserCounts() {
        return userService.getUserCounts();
    }



}
