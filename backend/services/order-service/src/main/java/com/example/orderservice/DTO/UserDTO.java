package com.example.orderservice.DTO;

import lombok.Data;
import org.apache.catalina.User;

@Data
public class UserDTO {
    private Long id;
    private Long userId;

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
