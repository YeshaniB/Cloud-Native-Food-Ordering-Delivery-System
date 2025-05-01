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

    @Column(name = "restaurant_name")
    private String restaurantName;

    @Column(name = "restaurant_location")
    private String restaurantLocation;

    @Column(name = "owner_name")
    private String ownerName;

    @Column(name = "owner_address")
    private String ownerAddress;

    @Column(name = "owner_nic")
    private String ownerNIC;

    @Column(name = "license_number")
    private String licenseNumber;

    @Column(name = "owner_contact")
    private String ownerContact;

    @Column(name = "restaurant_contact")
    private String restaurantContact;

    @Column(name = "restaurant_email")
    private String restaurantEmail;

    @Column(name = "logo_url")
    private String logoUrl;

    @Column(name = "description")
    private String description;

}
