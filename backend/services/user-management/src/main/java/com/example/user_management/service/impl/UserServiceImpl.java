package com.example.user_management.service.impl;

import com.example.user_management.dto.UserDto;
import com.example.user_management.enums.UserType;
import com.example.user_management.model.User;
import com.example.user_management.repository.UserRepository;
import com.example.user_management.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.user_management.repository.DriverDetailsRepository;
import com.example.user_management.repository.RestaurantDetailsRepository;





import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private final DriverDetailsRepository driverDetailsRepository;
    private final RestaurantDetailsRepository restaurantDetailsRepository;

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
        Optional<User> userOpt = userRepository.findById(id);
        if (userOpt.isEmpty()) {
            throw new RuntimeException("User not found with id: " + id);
        }

        User user = userOpt.get();

        // Delete related driver details if applicable
        if (user.getUserType() == UserType.DRIVER) {
            DriverDetails driver = driverDetailsRepository.findByUserId(id);
            if (driver != null) {
                driverDetailsRepository.delete(driver);
            }
        }

        // Delete related restaurant details if applicable
        if (user.getUserType() == UserType.RESTAURANT) {
            RestaurantDetails restaurant = restaurantDetailsRepository.findByUserId(id);
            if (restaurant != null) {
                restaurantDetailsRepository.delete(restaurant);
            }
        }

        // Finally delete the user
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
        return userRepository.findByIsActivated(isActive); // ✅ match again
    }

    @Override
    public Map<String, Long> getUserCounts() {
        List<User> allUsers = getAllUsers();

        long totalUsers = allUsers.size();
        long totalCustomers = allUsers.stream().filter(user -> user.getUserType() == UserType.CUSTOMER).count();
        long totalRestaurants = allUsers.stream().filter(user -> user.getUserType() == UserType.RESTAURANT).count();
        long totalDrivers = allUsers.stream().filter(user -> user.getUserType() == UserType.DRIVER).count();

        Map<String, Long> counts = new HashMap<>();
        counts.put("totalUsers", totalUsers);
        counts.put("totalCustomers", totalCustomers);
        counts.put("totalRestaurants", totalRestaurants);
        counts.put("totalDrivers", totalDrivers);

        return counts;
    }



}


