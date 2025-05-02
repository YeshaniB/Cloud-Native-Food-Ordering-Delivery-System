package com.example.user_management.service.impl;

import com.example.user_management.dto.RestaurantDetailsDto;
import com.example.user_management.model.RestaurantDetails;
import com.example.user_management.repository.RestaurantDetailsRepository;
import com.example.user_management.service.RestaurantService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RestaurantServiceImpl implements RestaurantService {

    private final RestaurantDetailsRepository restaurantDetailsRepository;

    @Override
    public List<RestaurantDetailsDto> getAllRestaurantDetails() {
        List<RestaurantDetails> restaurants = restaurantDetailsRepository.findAll();

        return restaurants.stream().map(restaurant -> {
            RestaurantDetailsDto dto = new RestaurantDetailsDto();
            dto.setRestaurantName(restaurant.getRestaurantName());
            dto.setRestaurantLocation(restaurant.getRestaurantLocation());
            dto.setOwnerName(restaurant.getOwnerName());
            dto.setOwnerAddress(restaurant.getOwnerAddress());
            dto.setOwnerNIC(restaurant.getOwnerNIC());
            dto.setLicenseNumber(restaurant.getLicenseNumber());
            dto.setOwnerContact(restaurant.getOwnerContact());
            dto.setRestaurantContact(restaurant.getRestaurantContact());
            dto.setRestaurantEmail(restaurant.getRestaurantEmail());
            dto.setLogoUrl(restaurant.getLogoUrl());
            dto.setDescription(restaurant.getDescription());


            // ✅ Fix: Map userId if user is not null
            if (restaurant.getUser() != null) {
                dto.setUserId(restaurant.getUser().getId());
                dto.setActivated(restaurant.getUser().isActivated());

            }

            return dto;
        }).collect(Collectors.toList());
    }

}
