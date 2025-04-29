package com.example.user_management.controller;

import com.example.user_management.dto.RestaurantDetailsDto;
import com.example.user_management.service.RestaurantService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/restaurants")
@RequiredArgsConstructor
public class RestaurantDetailsController {

    private final RestaurantService restaurantService;

    @GetMapping
    public List<RestaurantDetailsDto> getAllRestaurants() {
        return restaurantService.getAllRestaurantDetails();
    }
}
