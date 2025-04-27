package com.example.user_management.service;

import com.example.user_management.dto.UserDto;
import com.example.user_management.model.User;

import java.util.List;

public interface UserService {
    User registerUser(UserDto userDto);
    List<User> getAllUsers();
    User getUserById(Long id);
    void deleteUser(Long id);
    User activateUser(Long id);
    User deactivateUser(Long id);
    List<User> getUsersByType(String type);
    List<User> getUsersByActivationStatus(boolean isActive);
}
