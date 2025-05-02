package com.example.user_management.service;

import com.example.user_management.dto.RestaurantDetailsDto;
import java.util.List;

public interface RestaurantService {
    List<RestaurantDetailsDto> getAllRestaurantDetails();

}
