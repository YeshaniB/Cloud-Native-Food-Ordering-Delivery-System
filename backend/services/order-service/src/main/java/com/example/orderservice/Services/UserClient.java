package com.example.orderservice.Services;

import com.example.orderservice.DTO.MenuItemDTO;
import com.example.orderservice.DTO.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;
import java.util.Objects;

@Service
public class UserClient {
    @Autowired
    private RestTemplate restTemplate;

    public List<UserDTO> getRestaurantData() {
        String url = "http://user-management:8081/api/restaurants";
        ResponseEntity<UserDTO[]> response = restTemplate.getForEntity(url, UserDTO[].class);
        return Arrays.asList(Objects.requireNonNull(response.getBody()));
    }
}
