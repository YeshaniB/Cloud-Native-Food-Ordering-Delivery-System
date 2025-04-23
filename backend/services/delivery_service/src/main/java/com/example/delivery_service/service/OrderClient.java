package com.example.delivery_service.service;

import jakarta.persistence.criteria.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;
import java.util.Objects;

@Service
public class OrderClient {

    @Autowired
    private RestTemplate restTemplate;

    public List<Order> getPreparedOrders() {
        String url = "http://localhost:8081/getPrepared"; // Replace with order-service address
        ResponseEntity<Order[]> response = restTemplate.getForEntity(url, Order[].class);
        return Arrays.asList(Objects.requireNonNull(response.getBody()));
    }
}

