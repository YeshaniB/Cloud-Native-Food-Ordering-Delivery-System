package com.example.delivery_service.service;

import com.example.delivery_service.dto.OrderDTO;
import com.example.delivery_service.model.Delivery;
import com.example.delivery_service.model.Driver;
import com.example.delivery_service.model.Location;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeliveryAssignmentScheduler {

    @Autowired
    private OrderClient orderClient;

    @Autowired
    private DeliveryService deliveryService;

    @Autowired
    private DriverService driverService;

    // Run every 30 seconds to check for new orders
    @Scheduled(fixedRate = 30000)
    public void assignDriversToPreparedOrders() {
        try {
            List<OrderDTO> preparedOrders = orderClient.getPreparedOrders();

            for (OrderDTO order : preparedOrders) {
                // Check if this order already has a delivery assigned
                if (!deliveryService.existsByOrderId(order.getOrderId())) {
                    try {
                        Location orderLocation = parseLocationFromString(order.getDeliveryLocation());
                        assignDriverToOrder(order, orderLocation);
                    } catch (Exception e) {
                        System.err.println("Error assigning driver to order " + order.getOrderId() + ": " + e.getMessage());
                    }
                }
            }
        } catch (Exception e) {
            System.err.println("Error in delivery assignment scheduler: " + e.getMessage());
        }
    }

    private void assignDriverToOrder(OrderDTO order, Location orderLocation) {
        List<Driver> nearbyDrivers = driverService.findNearbyAvailableDrivers(orderLocation, 5.0); // 5km radius

        if (!nearbyDrivers.isEmpty()) {
            Driver driver = nearbyDrivers.get(0);
            deliveryService.createDelivery(
                    order.getOrderId(),
                    order.getCustomerName(),
                    order.getDeliveryLocation(),
                    driver
            );

            // Update driver status to busy
            driver.setStatus("Busy");
            driverService.updateDriver(driver);
        }
    }

    private Location parseLocationFromString(String locationStr) {
        String[] parts = locationStr.split(",");
        double lat = Double.parseDouble(parts[0].trim());
        double lng = Double.parseDouble(parts[1].trim());
        return new Location(lat, lng);
    }
}
