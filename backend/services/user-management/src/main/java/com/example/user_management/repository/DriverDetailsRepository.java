package com.example.user_management.repository;

import com.example.user_management.model.DriverDetails;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DriverDetailsRepository extends JpaRepository<DriverDetails, Long> {
    Optional<DriverDetails> findByUserId(Long userId);
}
