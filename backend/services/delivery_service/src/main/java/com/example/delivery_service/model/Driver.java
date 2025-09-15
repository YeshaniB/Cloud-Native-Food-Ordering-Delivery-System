package com.example.delivery_service.model;

import jakarta.persistence.Embedded;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Setter
@Getter
@Document(collection = "drivers")
public class Driver {

    @Id
    private String id;

    private String name;

    @Indexed(unique = true)
    private String phoneNumber;

    private String vehicleType; // e.g., "Bike", "Car", "Truck"

    private String vehicleNo;

    private String status = "Offline"; // Available, Busy, Offline

    @Embedded
    private Location location;

    private List<String> deliveries; // MongoDB typically stores references as IDs or embedded docs

    // Getters and Setters
    // Location class INSIDE Driver

    // Constructor
    public Driver(Location location) {
        this.location = location != null ? location : new Location(); // Initialize if null
    }

    // Getters and Setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getVehicleType() {
        return vehicleType;
    }

    public void setVehicleType(String vehicleType) {
        this.vehicleType = vehicleType;
    }

    public String getVehicleNo() {
        return vehicleNo;
    }

    public void setVehicleNo(String vehicleNo) {
        this.vehicleNo = vehicleNo;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public List<String> getDeliveries() {
        return deliveries;
    }

    public void setDeliveries(List<String> deliveries) {
        this.deliveries = deliveries;
    }

}