package com.example.orderservice.DTO;

import com.example.orderservice.Interfaces.StatusCountProjection;
import com.example.orderservice.Services.RestaurantClinet;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jdk.jfr.DataAmount;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.awt.*;
import java.util.List;

@Builder
@Getter
@Setter
@Document(collection = "RestaurantDTO")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RestaurantDTO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private double price;
    private boolean available = true;
    private String imageUrl;



}
