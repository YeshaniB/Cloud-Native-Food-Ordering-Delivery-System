package com.example.delivery_service.controller;

import com.example.delivery_service.model.Driver;
import com.example.delivery_service.model.Location;
import com.example.delivery_service.repository.DriverRepository;
import com.example.delivery_service.service.DriverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/drivers")
public class DriverController {

    private final DriverRepository driverRepository;
    private final DriverService driverService; // Declare driverService

    @Autowired
    public DriverController(DriverRepository driverRepository, DriverService driverService) {
        this.driverRepository = driverRepository;
        this.driverService = driverService; // Initialize driverService
    }

    // Get all drivers
    @GetMapping
    public List<Driver> getAllDrivers() {
        try {
            return driverRepository.findAll();
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while fetching drivers: " + e.getMessage());
        }
    }

    // Get driver by ID
    @GetMapping("/{id}")
    public Driver getDriverById(@PathVariable String id) {
        return driverRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Driver not found with id: " + id));
    }

    // Create new driver
//    @PostMapping
//    public Driver createDriver(@RequestBody Driver driver) {
//        return driverRepository.save(driver);
//    }
    @PostMapping
    public Driver createDriver(@RequestBody Driver driver) {
        return driverService.registerDriver(driver);
    }

    // Update driver details
    @PutMapping("/{id}")
    public Driver updateDriver(@PathVariable String id, @RequestBody Driver updatedDriver) {
        Driver driver = driverRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Driver not found with id: " + id));

        driver.setName(updatedDriver.getName());
        driver.setPhoneNumber(updatedDriver.getPhoneNumber());
        driver.setStatus(updatedDriver.getStatus());

        return driverRepository.save(driver);
    }

    // Delete driver
    @DeleteMapping("/{id}")
    public String deleteDriver(@PathVariable String id) {
        if (!driverRepository.existsById(id)) {
            throw new RuntimeException("Driver not found with id: " + id);
        }
        driverRepository.deleteById(id);
        return "Driver with ID " + id + " deleted successfully.";
    }

    // Get first available driver
    @GetMapping("/available")
    public Driver getAvailableDriver() {
        return driverRepository.findFirstByStatus("Available")
                .orElseThrow(() -> new RuntimeException("No available drivers."));
    }

    // Update status and location
    @PutMapping("/updateStatusAndLocation/{id}")
    public Driver updateStatusAndLocation(@PathVariable String id, @RequestBody Driver updatedDriver) {
        try {
            if (updatedDriver.getStatus() == null || updatedDriver.getLocation() == null) {
                throw new IllegalArgumentException("Status or Location cannot be null");
            }

            String status = updatedDriver.getStatus();
            double lat = updatedDriver.getLocation().getLat();
            double lng = updatedDriver.getLocation().getLng();

            return driverService.updateDriverStatus(id, status, lat, lng);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid input: " + e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while updating the driver: " + e.getMessage());
        }
    }
//    @PutMapping("/updateStatusAndLocation/{id}")
//    public Driver updateStatusAndLocation(@PathVariable String id, @RequestBody Driver updatedDriver) {
//        try {
//            if (updatedDriver.getStatus() == null || updatedDriver.getLocation() == null) {
//                throw new IllegalArgumentException("Status or Location cannot be null");
//            }
//            return driverService.updateDriverStatus(id, status,lat,lng);
//        } catch (IllegalArgumentException e) {
//            throw new RuntimeException("Invalid input: " + e.getMessage());
//        } catch (Exception e) {
//            throw new RuntimeException("An error occurred while updating the driver: " + e.getMessage());
//        }
//    }

    @PutMapping("/updateLocation")
    public ResponseEntity<String> updateLocation(@RequestParam String driverId, @RequestParam double lat, @RequestParam double lng) {
        Driver driver = driverRepository.findById(driverId)
                .orElseThrow(() -> new RuntimeException("Driver not found"));

        // Initialize location if null
        if (driver.getLocation() == null) {
            driver.setLocation(new Location());
        }

        // Now, update latitude and longitude
        driver.getLocation().setLat(lat);
        driver.getLocation().setLng(lng);

        driverRepository.save(driver);

        return ResponseEntity.ok("Location updated successfully");
    }
}