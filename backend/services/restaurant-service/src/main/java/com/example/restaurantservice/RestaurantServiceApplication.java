package com.example.restaurantservice;

import com.example.restaurantservice.model.MenuItem;
import com.example.restaurantservice.repository.MenuItemRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class RestaurantServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(RestaurantServiceApplication.class, args);
	}

}
