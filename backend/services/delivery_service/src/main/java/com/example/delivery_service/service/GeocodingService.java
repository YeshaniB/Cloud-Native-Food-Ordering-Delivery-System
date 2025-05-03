package com.example.delivery_service.service;

import com.example.delivery_service.model.Location;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Map;

@Service
public class GeocodingService {

    @Value("${google.maps.api.key}")
    private String apiKey;

    @Autowired
    private RestTemplate restTemplate;

    public Location geocodeAddress(String address) {
        String url = UriComponentsBuilder.fromHttpUrl("https://maps.googleapis.com/maps/api/geocode/json")
                .queryParam("address", address)
                .queryParam("key", apiKey)
                .toUriString();

        Map<String, Object> response = restTemplate.getForObject(url, Map.class);

        if ("OK".equals(response.get("status"))) {
            Map<String, Object> location = (Map<String, Object>)
                    ((Map<String, Object>)
                            ((Map<String, Object>) response.get("results[0]"))
                                    .get("geometry"))
                            .get("location");

            double lat = (Double) location.get("lat");
            double lng = (Double) location.get("lng");

            return new Location(lat, lng);
        }

        throw new RuntimeException("Geocoding failed for address: " + address);
    }
}