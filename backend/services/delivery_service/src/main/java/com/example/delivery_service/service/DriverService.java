package com.example.delivery_service.service;

import com.example.delivery_service.model.Driver;
import com.example.delivery_service.model.Location;
import com.example.delivery_service.repository.DriverRepository;
import com.example.delivery_service.utill.GeoUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DriverService {
    @Autowired
    private DriverRepository driverRepository;

    public Driver updateDriverStatus(String driverId, String status, double lat, double lng) {
        Driver driver = driverRepository.findById(driverId).orElseThrow(() -> new RuntimeException("Driver not found"));

        // Ensure Location is initialized before setting latitude and longitude
        if (driver.getLocation() == null) {
            driver.setLocation(new Location());
        }

        Location location = driver.getLocation();
        location.setLat(lat);
        location.setLng(lng);

        // Proceed with updating other fields and save
        driver.setStatus(status);
        driverRepository.save(driver);
        return driver;
    }

    public Driver registerDriver(Driver driver) {
        driver.setStatus("Offline");
        if (driver.getLocation() == null) {
            Location defaultLocation = new Location();
            defaultLocation.setLat(0.0);
            defaultLocation.setLng(0.0);
            driver.setLocation(defaultLocation);
        }
        return driverRepository.save(driver);
    }

    public List<Driver> getAllDrivers() {
        List<Driver> drivers = driverRepository.findAll();
        if (drivers != null) {
            for (Driver driver : drivers) {
                if (driver != null && driver.getLocation() == null) {
                    driver.setLocation(new Location());
                }
            }
        }
        return drivers;
    }

    public List<Driver> findNearbyAvailableDrivers(Location deliveryLocation, double maxDistanceKm) {
        List<Driver> allDrivers = driverRepository.findAll();

        return allDrivers.stream()
                .filter(driver -> "Available".equalsIgnoreCase(driver.getStatus()) && driver.getLocation() != null)
                .filter(driver -> {
                    double distance = GeoUtils.calculateDistance(
                            deliveryLocation.getLat(),
                            deliveryLocation.getLng(),
                            driver.getLocation().getLat(),
                            driver.getLocation().getLng()
                    );
                    return distance <= maxDistanceKm;
                })
                .sorted(Comparator.comparingDouble(driver ->
                        GeoUtils.calculateDistance(
                                deliveryLocation.getLat(),
                                deliveryLocation.getLng(),
                                driver.getLocation().getLat(),
                                driver.getLocation().getLng()
                        )
                ))
                .collect(Collectors.toList());
    }

    public void updateDriver(Driver driver) {

    }


//    public List<Driver> findNearbyAvailableDrivers(Location deliveryLocation, double maxDistanceKm) {
//        List<Driver> availableDrivers = driverRepository.findByStatus("Available");
//
//        return availableDrivers.stream()
//                .filter(driver -> {
//                    if (driver.getLocation() == null) return false;
//
//                    double distance = calculateDistance(
//                            orderLocation.getLat(), orderLocation.getLng(),
//                            driver.getLocation().getLat(), driver.getLocation().getLng()
//                    );
//                    return distance <= maxDistanceKm;
//                })
//                .sorted(Comparator.comparingDouble(driver ->
//                        calculateDistance(
//                                orderLocation.getLat(), orderLocation.getLng(),
//                                driver.getLocation().getLat(), driver.getLocation().getLng()
//                        )
//                ))
//                .collect(Collectors.toList());
//    }

    private double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        final int R = 6371; // Radius of the earth in km

        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c; // Distance in km
    }


}

    // Update status and location
    // Corrected updateDriverStatus method
    // Corrected updateDriverStatus method
//    public Driver updateDriverStatus(String id, Driver updatedData) {
//        Driver driver = driverRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("Driver not found"));
//
//        driver.setStatus(updatedData.getStatus());
//
//        if ("Offline".equalsIgnoreCase(updatedData.getStatus())) {
//            Location defaultLocation = new Location();
//            defaultLocation.setLat(0.0); // Default latitude
//            defaultLocation.setLng(0.0); // Default longitude
//            driver.setLocation(defaultLocation);
//        } else {
//            driver.setLocation(updatedData.getLocation());
//        }
//
//        return driverRepository.save(driver);
//    }

    // Update driver status and location
//    public Driver updateDriverStatus(String driverId, String status, double lat, double lng) {
//        Driver driver = driverRepository.findById(driverId)
//                .orElseThrow(() -> new RuntimeException("Driver not found"));
//
//        driver.setStatus(status);
//        driver.getLocation().setLat(lat);
//        driver.getLocation().setLng(lng);
//
//        return driverRepository.save(driver);
//    }

//}
