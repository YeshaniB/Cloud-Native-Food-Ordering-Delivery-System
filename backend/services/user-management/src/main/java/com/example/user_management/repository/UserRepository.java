package com.example.user_management.repository;

import com.example.user_management.model.User;
import com.example.user_management.enums.UserType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByUserType(UserType userType);
    List<User> findByIsActivated(boolean isActivated); // ✅ exact match


    Optional<User> findByEmail(String email);;
}
