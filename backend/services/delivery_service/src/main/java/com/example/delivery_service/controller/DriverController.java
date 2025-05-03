package com.example.delivery_service.controller;

import com.example.delivery_service.dto.OrderDTO;
import com.example.delivery_service.model.Delivery;
import com.example.delivery_service.model.Driver;
import com.example.delivery_service.model.Location;
import com.example.delivery_service.repository.DriverRepository;
import com.example.delivery_service.service.DeliveryService;
import com.example.delivery_service.service.DriverService;
import com.example.delivery_service.service.OrderClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/drivers")
public class DriverController {

    private final DriverRepository driverRepository;
    private final DriverService driverService; // Declare driverService
    private final DeliveryService deliveryService;
    private final OrderClient orderClient;

    @Autowired
    public DriverController(DriverRepository driverRepository, DriverService driverService, DeliveryService deliveryService, OrderClient orderClient) {
        this.driverRepository = driverRepository;
        this.driverService = driverService; // Initialize driverService
        this.deliveryService = deliveryService;
        this.orderClient = orderClient;
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
    // In DriverController.java
    @GetMapping("/{driverId}/nearbyOrders")
    public List<OrderDTO> getNearbyOrders(
            @PathVariable String driverId,
            @RequestParam double radiusKm) {

        Driver driver = driverRepository.findById(driverId)
                .orElseThrow(() -> new RuntimeException("Driver not found"));

        if (driver.getLocation() == null) {
            throw new RuntimeException("Driver location not available");
        }

        return orderClient.getNearbyOrders(
                driver.getLocation().getLat(),
                driver.getLocation().getLng(),
                radiusKm);
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
//    @GetMapping("/{driverId}/nearbyDeliveries")
//    public List<Delivery> getNearbyDeliveries(@PathVariable String driverId,
//                                              @RequestParam double lat,
//                                              @RequestParam double lng,
//                                              @RequestParam double radiusKm) {
//        return deliveryService.getNearbyDeliveries(lat, lng, radiusKm);
//    }
    @GetMapping("/availableNearbyDeliveries/{Id}/{radiusKm}")
    public List<Delivery> getAvailableNearbyDeliveries(
            @PathVariable String Id,
            @PathVariable double radiusKm) {
        return deliveryService.getAvailableNearbyDeliveries(Id, radiusKm);
    }
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