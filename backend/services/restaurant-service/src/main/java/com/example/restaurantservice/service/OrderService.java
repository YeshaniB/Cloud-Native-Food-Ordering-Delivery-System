package com.example.restaurantservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.example.restaurantservice.dto.OrderDto;

import java.util.Arrays;
import java.util.List;
import java.util.Objects;

@Service
public class OrderService {

    @Autowired
    private RestTemplate restTemplate;

    public List<OrderDto> getPendingOrders() {
        String url = "http://order-service:8081/pendingOrders"; // Replace with actual URL in production
        ResponseEntity<OrderDto[]> response = restTemplate.getForEntity(url, OrderDto[].class);
        return Arrays.asList(Objects.requireNonNull(response.getBody()));
    }

}
