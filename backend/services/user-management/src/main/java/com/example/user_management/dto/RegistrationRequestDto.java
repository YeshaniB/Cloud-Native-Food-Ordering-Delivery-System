package com.example.user_management.dto;

import lombok.Data;

@Data
public class RegistrationRequestDto {
    private UserDto user;
    private RestaurantDetailsDto restaurantDetails; // optional
    private DriverDetailsDto driverDetails;         // optional
}
