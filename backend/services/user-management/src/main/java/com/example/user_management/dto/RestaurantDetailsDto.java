package com.example.user_management.dto;

import lombok.Data;

@Data
public class RestaurantDetailsDto {
    private String restaurantName;
    private String restaurantLocation;
    private String ownerName;
    private String ownerAddress;
    private String ownerNIC;
    private String licenseNumber;
    private String ownerContact;
    private String restaurantContact;
    private String restaurantEmail;
    private String logoUrl;
    private String description;

}
