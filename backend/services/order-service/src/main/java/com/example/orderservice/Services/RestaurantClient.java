package com.example.orderservice.Services;

import com.example.orderservice.DTO.MenuItemDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;
import java.util.Objects;

@Service
public class RestaurantClient {

    @Autowired
    private RestTemplate restTemplate;

    public List<MenuItemDTO> getResData() {
        String url = "http://restaurant-service:8081/api/menu";
        ResponseEntity<MenuItemDTO[]> response = restTemplate.getForEntity(url, MenuItemDTO[].class);
        return Arrays.asList(Objects.requireNonNull(response.getBody()));
    }
}
