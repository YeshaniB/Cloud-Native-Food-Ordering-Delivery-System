package com.example.delivery_service.service;


import com.example.delivery_service.model.Delivery;
import com.example.delivery_service.model.Driver;
import com.example.delivery_service.repository.DeliveryRepository;
import com.example.delivery_service.repository.DriverRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class DeliveryService {

    @Autowired
    private DeliveryRepository deliveryRepository;
    @Autowired
    private DriverRepository driverRepository;

    public List<Delivery> getAllDeliveries() {

        return deliveryRepository.findAll();
    }

    public Optional<Delivery> getDeliveryById(String id) {
        return deliveryRepository.findById(id);
    }

    // Assign a driver to a delivery based on availability and location
    public Delivery assignDriver(String orderId, String customer, String deliveryLocation) {
        // Find the nearest available driver
        List<Driver> availableDrivers = driverRepository.findAvailableDriversByLocation(deliveryLocation);
        if (availableDrivers.isEmpty()) {
            throw new RuntimeException("No available drivers near the delivery location.");
        }

        // Select the first available driver
        Driver assignedDriver = availableDrivers.get(0);
        assignedDriver.setStatus("Busy");
        driverRepository.save(assignedDriver); // Update driver status


        // Create a new delivery
        Delivery delivery = new Delivery();
        delivery.setOrderId(orderId);
        delivery.setCustomer(customer);
        delivery.setDeliveryLocation(deliveryLocation);
        delivery.setDriver(assignedDriver);
        delivery.setStatus("Pending");
        delivery.setAssignedTime(LocalDateTime.now());

        return deliveryRepository.save(delivery);
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