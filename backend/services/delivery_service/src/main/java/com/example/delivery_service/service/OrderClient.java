package com.example.delivery_service.service;

import com.example.delivery_service.dto.OrderDTO;
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

    public List<OrderDTO> getPreparedOrders() {
        String url = "http://order-service:8081/getPrepared"; // Correct endpoint// Replace with actual URL in production
        ResponseEntity<OrderDTO[]> response = restTemplate.getForEntity(url, OrderDTO[].class);
        return Arrays.asList(Objects.requireNonNull(response.getBody()));
    }

    public List<OrderDTO> getNearbyOrders(double lat, double lng, double radiusKm) {
        String url = "http://order-service:8081/orders/nearby";
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(url)
                .queryParam("lat", lat)
                .queryParam("lng", lng)
                .queryParam("radiusKm", radiusKm);

        ResponseEntity<OrderDTO[]> response = restTemplate.getForEntity(builder.toUriString(), OrderDTO[].class);
        return Arrays.asList(Objects.requireNonNull(response.getBody()));
    }

}

