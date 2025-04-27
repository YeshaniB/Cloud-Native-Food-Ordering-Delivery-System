package com.example.orderservice.Services;

import com.example.orderservice.DTO.RestaurantDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class RestaurantClinet {

    public List<RestaurantClinet> findAll;
    @Autowired
    private RestTemplate restTemplate;

    public List<RestaurantDTO> getResData() {
        String url = "http://localhost:8081/api/menu";

        // Make the GET request and get the response as a List of RestaurantDTO
        ResponseEntity<List<RestaurantDTO>> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<RestaurantDTO>>() {}
        );

        // Return the list of RestaurantDTO from the response
        return response.getBody();
    }
}
