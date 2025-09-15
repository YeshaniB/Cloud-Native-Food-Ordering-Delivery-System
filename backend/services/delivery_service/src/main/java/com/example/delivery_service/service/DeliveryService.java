package com.example.delivery_service.service;


import com.example.delivery_service.model.Delivery;
import com.example.delivery_service.model.Driver;
import com.example.delivery_service.model.Location;
import com.example.delivery_service.repository.DeliveryRepository;
import com.example.delivery_service.repository.DriverRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.geo.Distance;
import org.springframework.data.geo.Point;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DeliveryService {

    @Autowired
    private DeliveryRepository deliveryRepository;
    @Autowired
    private DriverRepository driverRepository;
    @Autowired
    private DriverService driverService;
    @Autowired
    private GeocodingService geocodingService;

    public List<Delivery> getAllDeliveries() {

        return deliveryRepository.findAll();
    }

    public List<Delivery> getNearbyDeliveries(double lat, double lng, double radiusKm) {
        Point location = new Point(lat, lng);
        Distance distance = new Distance(radiusKm);
        return deliveryRepository.findByDeliveryLocationNear(location, distance);
    }

    public Optional<Delivery> getDeliveryById(String id) {
        return deliveryRepository.findById(id);
    }


    public List<Delivery> getAvailableNearbyDeliveries(String driverId, double radiusKm) {
        // Get the driver
        Driver driver = driverRepository.findById(driverId)
                .orElseThrow(() -> new RuntimeException("Driver not found"));

        // Only proceed if driver is available
        if (!"Available".equalsIgnoreCase(driver.getStatus())) {
            throw new RuntimeException("Driver is not available for deliveries");
        }

        // Get pending deliveries near the driver's location
        Point driverLocation = new Point(driver.getLocation().getLat(), driver.getLocation().getLng());
        Distance distance = new Distance(radiusKm);

        List<Delivery> nearbyDeliveries = deliveryRepository.findByDeliveryLocationNear(driverLocation, distance);

        // Filter to only include pending deliveries
        return nearbyDeliveries.stream()
                .filter(d -> "Pending".equalsIgnoreCase(d.getStatus()))
                .collect(Collectors.toList());
    }

    public Delivery assignDriverToDelivery(String deliveryId, String driverId) {
        Delivery delivery = deliveryRepository.findById(deliveryId)
                .orElseThrow(() -> new RuntimeException("Delivery not found"));

        Driver driver = driverRepository.findById(driverId)
                .orElseThrow(() -> new RuntimeException("Driver not found"));

        if (!"Available".equalsIgnoreCase(driver.getStatus())) {
            throw new RuntimeException("Driver is not available");
        }

        delivery.setDriver(driver);
        delivery.setStatus("Pending");
        driver.setStatus("Busy");

        driverRepository.save(driver);
        return deliveryRepository.save(delivery);
    }


//    private Location parseLocationFromString(String locationStr) {
//        if (locationStr == null || !locationStr.contains(",")) {
//            throw new IllegalArgumentException("Invalid location format. Expected 'lat,lng'");
//        }
//
//        String[] parts = locationStr.split(",");
//        double lat = Double.parseDouble(parts[0].trim());
//        double lng = Double.parseDouble(parts[1].trim());
//
//        Location location = new Location();
//        location.setLat(lat);
//        location.setLng(lng);
//        return location;
//    }

//    public Delivery assignDriver(String orderId, String customer, String deliveryLocation) {
//        try {
//            // Try to parse as coordinates first, then fall back to geocoding
//            Location orderLoc;
//            try {
//                orderLoc = parseLocationFromString(deliveryLocation);
//            } catch (IllegalArgumentException e) {
//                orderLoc = geocodingService.geocodeAddress(deliveryLocation);
//            }
//
//            List<Driver> nearbyDrivers = driverService.findNearbyAvailableDrivers(deliveryLocation, 5.0);
//            if (nearbyDrivers.isEmpty()) {
//                throw new RuntimeException("No nearby drivers available.");
//            }
//
//            Driver selectedDriver = nearbyDrivers.get(0);
//            selectedDriver.setStatus("Busy");
//            driverRepository.save(selectedDriver);
//
//            Delivery delivery = new Delivery();
//            delivery.setOrderId(orderId);
//            delivery.setCustomer(customer);
//            delivery.setDeliveryLocation(deliveryLocation);
//            delivery.setDriver(selectedDriver);
//            delivery.setStatus("Pending");
//            delivery.setAssignedTime(LocalDateTime.now());
//
//            return deliveryRepository.save(delivery);
//        } catch (Exception e) {
//            throw new RuntimeException("Failed to assign driver: " + e.getMessage(), e);
//        }
//    }

    private Location parseLocationFromString(String locationStr) {
        if (locationStr == null || !locationStr.contains(",")) {
            throw new IllegalArgumentException("Invalid location format. Expected 'lat,lng'");
        }

        String[] parts = locationStr.split(",");
        if (parts.length != 2) {
            throw new IllegalArgumentException("Invalid location format. Expected 'lat,lng'");
        }

        try {
            double lat = Double.parseDouble(parts[0].trim());
            double lng = Double.parseDouble(parts[1].trim());
            return new Location(lat, lng);
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("Invalid coordinate values: " + e.getMessage());
        }
    }





    public Delivery createDelivery(String orderId, String customer, String deliveryLocation, Driver driver) {
        Delivery delivery = new Delivery();
        delivery.setOrderId(orderId);
        delivery.setCustomer(customer);
        delivery.setDeliveryLocation(deliveryLocation);
        delivery.setDriver(driver);
        delivery.setStatus("Pending");
        delivery.setAssignedTime(LocalDateTime.now());

        return deliveryRepository.save(delivery);
    }

    public boolean existsByOrderId(String orderId) {
        return deliveryRepository.findByOrderId(orderId).isPresent();
    }


    // Start a delivery
    public Delivery startDelivery(String deliveryId) {
        Delivery delivery = deliveryRepository.findById(deliveryId)
                .orElseThrow(() -> new RuntimeException("Delivery not found"));
        delivery.setStatus("Started");
        return deliveryRepository.save(delivery);
    }


    // Complete a delivery
    public Delivery completeDelivery(String deliveryId) {
        Delivery delivery = deliveryRepository.findById(deliveryId)
                .orElseThrow(() -> new RuntimeException("Delivery not found"));
        delivery.setStatus("Completed");
        delivery.setDeliveredTime(LocalDateTime.now());
        delivery.getDriver().setStatus("Available"); // Update driver status
        driverRepository.save(delivery.getDriver());
        return deliveryRepository.save(delivery);
    }


}
//import com.example.delivery_service.model.Delivery;
//import com.example.delivery_service.model.Driver;
//import com.example.delivery_service.repository.DeliveryRepository;
//import com.example.delivery_service.repository.DriverRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import java.time.LocalDateTime;
//import java.util.List;
//import java.util.Optional;
//
//@Service
//public class DeliveryService {
//
//    private final DeliveryRepository deliveryRepository;
//    private final DriverRepository driverRepository;
//
//    @Autowired
//    public DeliveryService(DeliveryRepository deliveryRepository, DriverRepository driverRepository) {
//        this.deliveryRepository = deliveryRepository;
//        this.driverRepository = driverRepository;
//    }
//
// Assign a driver to a delivery based on availability and location
//    public Delivery assignDriver(String orderId, String customer, String deliveryLocation) {
//        // Find the nearest available driver
//        List<Driver> availableDrivers = driverRepository.findAvailableDriversByLocation(deliveryLocation);
//        if (availableDrivers.isEmpty()) {
//            throw new RuntimeException("No available drivers near the delivery location.");
//        }
//
//        // Select the first available driver
//        Driver assignedDriver = availableDrivers.get(0);
//        assignedDriver.setStatus("Busy");
//        driverRepository.save(assignedDriver); // Update driver status
//
//
//        // Create a new delivery
//        Delivery delivery = new Delivery();
//        delivery.setOrderId(orderId);
//        delivery.setCustomer(customer);
//        delivery.setDeliveryLocation(deliveryLocation);
//        delivery.setDriver(assignedDriver);
//        delivery.setStatus("Pending");
//        delivery.setAssignedTime(LocalDateTime.now());
//
//        return deliveryRepository.save(delivery);
//    }
//    public Delivery assignDriver(Long orderId, String location) {
//        // 1. Find available drivers in the specified location
//        List<Driver> availableDrivers = driverRepository.findAvailableDriversByLocation(location);
//
//        if (availableDrivers.isEmpty()) {
//            throw new RuntimeException("No available drivers in this location");
//        }
//
//        // 2. Select a driver (e.g., first available)
//        Driver selectedDriver = availableDrivers.get(0);
//        selectedDriver.setStatus("Busy");
//        driverRepository.save(selectedDriver); // update driver status
//
//        // 3. Create a new delivery
//        Delivery delivery = new Delivery();
//        delivery.setOrderId(orderId);
//        delivery.setLocation(location);
//        delivery.setDriver(selectedDriver);
//        delivery.setStatus("Assigned");
//        delivery.setAssignedTime(LocalDateTime.now());
//
//        // 4. Save and return
//        return deliveryRepository.save(delivery);
//    }
//
//    public List<Delivery> getAllDeliveries() {
//        return deliveryRepository.findAll();
//    }
//
//    public Delivery updateDeliveryStatus(String deliveryId, String status) {
//        Delivery delivery = deliveryRepository.findById(deliveryId)
//                .orElseThrow(() -> new RuntimeException("Delivery not found"));
//
//        delivery.setStatus(status);
//
//        if ("Delivered".equals(status)) {
//            delivery.setDeliveredTime(LocalDateTime.now());
//            Driver driver = delivery.getDriver();
//            driver.setStatus("Available");
//            driverRepository.save(driver);
//        }
//
//        return deliveryRepository.save(delivery);
//    }
//}

//    public Delivery assignDriver(String orderId, String customer, String deliveryLocation) {
//        // Parse location string into a Location object
//        Location orderLoc = parseLocationFromString(deliveryLocation);
//
//        // Find nearby drivers within 5 km
//        List<Driver> nearbyDrivers = driverService.findNearbyAvailableDrivers(orderLoc, 100.0);
//        if (nearbyDrivers.isEmpty()) {
//            throw new RuntimeException("No nearby drivers available.");
//        }
//
//        Driver selectedDriver = nearbyDrivers.get(0);
//        selectedDriver.setStatus("Busy");
//        driverRepository.save(selectedDriver);
//
//        Delivery delivery = new Delivery();
//        delivery.setOrderId(orderId);
//        delivery.setCustomer(customer);
//        delivery.setDeliveryLocation(deliveryLocation);
//        delivery.setDriver(selectedDriver);
//        delivery.setStatus("Pending");
//        delivery.setAssignedTime(LocalDateTime.now());
//
//        return deliveryRepository.save(delivery);
//    }
