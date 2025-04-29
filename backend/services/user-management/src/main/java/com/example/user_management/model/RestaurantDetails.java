package com.example.user_management.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "restaurant_details")
public class RestaurantDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

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
