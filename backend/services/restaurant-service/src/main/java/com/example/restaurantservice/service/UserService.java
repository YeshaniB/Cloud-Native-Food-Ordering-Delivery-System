package com.example.restaurantservice.service;

import com.example.restaurantservice.dto.UserManagementDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final WebClient.Builder webClientBuilder;

    public List<UserManagementDto> getAllRestaurants() {
        UserManagementDto[] restaurants = webClientBuilder.build()
                .get()
                .uri("http://user-management-service/getRestaurants")  // call User Management Service
                .retrieve()
                .bodyToMono(UserManagementDto[].class)
                .block();

        return Arrays.asList(restaurants);
    }
}
