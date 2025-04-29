package com.example.orderservice.DTO;

import lombok.Data;

@Data
public class MenuItemDTO {

    private Long id;
    private String name;
    private String description;
    private double price;
    private boolean available;
    private String imageUrl;
    private Long restaurantId;

}
