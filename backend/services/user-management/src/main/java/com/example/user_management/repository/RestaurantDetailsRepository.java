package com.example.user_management.repository;

import com.example.user_management.model.RestaurantDetails;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RestaurantDetailsRepository extends JpaRepository<RestaurantDetails, Long> {
    Optional<RestaurantDetails> findByUserId(Long userId);
}
