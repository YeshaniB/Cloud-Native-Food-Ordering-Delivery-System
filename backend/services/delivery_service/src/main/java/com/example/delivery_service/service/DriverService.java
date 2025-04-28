package com.example.delivery_service.service;

import com.example.delivery_service.model.Driver;
import com.example.delivery_service.model.Location;
import com.example.delivery_service.repository.DriverRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DriverService {
    @Autowired
    private DriverRepository driverRepository;


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
}
