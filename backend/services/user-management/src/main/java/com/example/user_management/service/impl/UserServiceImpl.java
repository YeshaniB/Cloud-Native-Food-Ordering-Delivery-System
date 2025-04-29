package com.example.user_management.service.impl;

import com.example.user_management.dto.UserDto;
import com.example.user_management.enums.UserType;
import com.example.user_management.model.User;
import com.example.user_management.repository.UserRepository;
import com.example.user_management.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public User registerUser(UserDto userDto) {
        User user = new User();
        user.setName(userDto.getName());
        user.setContact(userDto.getContact());
        user.setEmail(userDto.getEmail());
        user.setUserType(userDto.getUserType());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));

        if (userDto.getUserType() == UserType.CUSTOMER || userDto.getUserType() == UserType.ADMIN) {
            user.setActivated(true);
        } else {
            user.setActivated(false);
        }
        return userRepository.save(user);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public User activateUser(Long id) {
        User user = getUserById(id);
        user.setActivated(true);
        return userRepository.save(user);
    }

    @Override
    public User deactivateUser(Long id) {
        User user = getUserById(id);
        user.setActivated(false);
        return userRepository.save(user);
    }

    @Override
    public List<User> getUsersByType(String type) {
        return userRepository.findByUserType(UserType.valueOf(type.toUpperCase()));
    }

    @Override
    public List<User> getUsersByActivationStatus(boolean isActive) {
        return userRepository.findByIsActivated(isActive);
    }
}
