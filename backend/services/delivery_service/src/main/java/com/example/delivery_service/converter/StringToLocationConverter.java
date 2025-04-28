package com.example.delivery_service.converter;

import com.example.delivery_service.model.Location;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class StringToLocationConverter implements Converter<String, Location> {

    @Override
    public Location convert(String source) {
        if (source == null || source.isEmpty()) {
            return null;
        }

        // Example: assuming your String looks like "latitude,longitude"
        String[] parts = source.split(",");
        if (parts.length != 2) {
            throw new IllegalArgumentException("Invalid Location format. Expected 'latitude,longitude'");
        }

        Location location = new Location();
        location.setLat(Double.parseDouble(parts[0].trim()));
        location.setLng(Double.parseDouble(parts[1].trim()));

        return location;
    }
}