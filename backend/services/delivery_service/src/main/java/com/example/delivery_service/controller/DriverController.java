package com.example.delivery_service.controller;

import com.example.delivery_service.model.Driver;
import com.example.delivery_service.repository.DriverRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/drivers")
public class
DriverController {

    private final DriverRepository driverRepository;

    @Autowired
    public DriverController(DriverRepository driverRepository) {
        this.driverRepository = driverRepository;
    }

    // Get all drivers
    @GetMapping
    public List<Driver> getAllDrivers() {
        return driverRepository.findAll();
    }

    // Get driver by ID
    @GetMapping("/{id}")
    public Driver getDriverById(@PathVariable String id) {
        return driverRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Driver not found with id: " + id));
    }

    // Create new driver
    @PostMapping
    public Driver createDriver(@RequestBody Driver driver) {
        return driverRepository.save(driver);
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
}
