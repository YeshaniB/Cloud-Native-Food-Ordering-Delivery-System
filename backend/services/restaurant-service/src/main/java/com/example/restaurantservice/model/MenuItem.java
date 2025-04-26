package com.example.restaurantservice.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class MenuItem {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private double price;
    private boolean available = true;
    private String imageUrl;
    private Long restaurantId;

    // Getters and Setters

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public boolean getAvailable() {
        return available;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public Long getRestaurantId() {
        return restaurantId;
    }

}
