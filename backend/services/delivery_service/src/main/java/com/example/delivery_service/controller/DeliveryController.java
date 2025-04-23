package com.example.delivery_service.controller;

import com.example.delivery_service.model.Delivery;
import com.example.delivery_service.service.DeliveryService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/deliveries")
public class DeliveryController {

    private final DeliveryService deliveryService;

    public DeliveryController(DeliveryService deliveryService) {
        this.deliveryService = deliveryService;
    }

    @PostMapping("/assign")
    public Delivery assignDriver(@RequestBody Map<String, Object> request) {
        Long orderId = Long.valueOf(request.get("orderId").toString());
        String location = request.get("location").toString();
        return deliveryService.assignDriver(orderId, location);
    }

    @GetMapping
    public List<Delivery> getAllDeliveries() {
        return deliveryService.getAllDeliveries();
    }

    @PutMapping("/{id}/status")
    public Delivery updateStatus(@PathVariable String id, @RequestParam String status) {
        return deliveryService.updateDeliveryStatus(id, status);
    }


}
