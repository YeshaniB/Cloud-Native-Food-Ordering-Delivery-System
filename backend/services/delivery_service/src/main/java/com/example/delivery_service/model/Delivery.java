package com.example.delivery_service.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Setter
@Getter
@Document(collection = "deliveries")
public class Delivery {

    @Id
    private String deliveryId;

    private String orderId;
    private String customer;
    private String deliveryLocation;
    private LocalDateTime assignedTime;
    private LocalDateTime deliveredTime;

    @DBRef
    private Driver driver;

    private String status; // Pending, Started, Completed

    public Delivery() {}

    public Delivery(String orderId, String customer, String deliveryLocation, Driver driver) {
        this.orderId = orderId;
        this.customer = customer;
        this.deliveryLocation = deliveryLocation;
        this.driver = driver;
        this.status = "Pending";
        this.assignedTime = LocalDateTime.now();
    }

    public String getDeliveryId() {
        return deliveryId;
    }

    public void setDeliveryId(String deliveryId) {
        this.deliveryId = deliveryId;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public String getCustomer() {
        return customer;
    }

    public void setCustomer(String customer) {
        this.customer = customer;
    }

    public String getDeliveryLocation() {
        return deliveryLocation;
    }

    public void setDeliveryLocation(String deliveryLocation) {
        this.deliveryLocation = deliveryLocation;
    }

    public LocalDateTime getAssignedTime() {
        return assignedTime;
    }

    public void setAssignedTime(LocalDateTime assignedTime) {
        this.assignedTime = assignedTime;
    }

    public LocalDateTime getDeliveredTime() {
        return deliveredTime;
    }

    public void setDeliveredTime(LocalDateTime deliveredTime) {
        this.deliveredTime = deliveredTime;
    }

    public Driver getDriver() {
        return driver;
    }

    public void setDriver(Driver driver) {
        this.driver = driver;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

//    @Id
//    private String id;
//
//    private Long orderId;
//
//    @DBRef
//    private Driver driver;
//
//    private String status; // e.g., "Pending", "In Transit", "Delivered"
//
//    private String location; // Order delivery location
//
//    private LocalDateTime assignedTime;
//    private LocalDateTime deliveredTime;
//
//    // Getters and Setters
//
//    public String getId() {
//        return id;
//    }
//
//    public void setId(String id) {
//        this.id = id;
//    }
//
//    public Long getOrderId() {
//        return orderId;
//    }
//
//    public void setOrderId(Long orderId) {
//        this.orderId = orderId;
//    }
//
//    public Driver getDriver() {
//        return driver;
//    }
//
//    public void setDriver(Driver driver) {
//        this.driver = driver;
//    }
//
//    public String getStatus() {
//        return status;
//    }
//
//    public void setStatus(String status) {
//        this.status = status;
//    }
//
//    public String getLocation() {
//        return location;
//    }
//
//    public void setLocation(String location) {
//        this.location = location;
//    }
//
//    public LocalDateTime getAssignedTime() {
//        return assignedTime;
//    }
//
//    public void setAssignedTime(LocalDateTime assignedTime) {
//        this.assignedTime = assignedTime;
//    }
//
//    public LocalDateTime getDeliveredTime() {
//        return deliveredTime;
//    }
//
//    public void setDeliveredTime(LocalDateTime deliveredTime) {
//        this.deliveredTime = deliveredTime;
//    }
}

