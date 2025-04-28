package com.example.delivery_service.controller;

import com.example.delivery_service.model.Delivery;
import com.example.delivery_service.service.DeliveryService;
import com.example.delivery_service.service.OrderClient;
import com.example.delivery_service.dto.OrderDTO;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/deliveries")
@CrossOrigin(origins = "http://localhost:3000") // Allow your React app
public class DeliveryController {

//    @Autowired
//    private DeliveryService deliveryService;
//    @Autowired
    //private OrderClient orderClient;
    private final DeliveryService deliveryService;
    private final OrderClient orderClient;

    //  Constructor includes OrderClient
    public DeliveryController(DeliveryService deliveryService, OrderClient orderClient) {
        this.deliveryService = deliveryService;
        this.orderClient = orderClient;
    }

    // Assign a driver to a delivery
    @PostMapping("/assign")
    public Delivery assignDriver(@RequestParam String orderId, @RequestParam String customer, @RequestParam String deliveryLocation) {
        return deliveryService.assignDriver(orderId, customer, deliveryLocation);
    }

    @GetMapping
    public List<Delivery> getAllDeliveries() {
        return deliveryService.getAllDeliveries();
    }

    // Start a delivery
    @PutMapping("/{id}/start")
    public Delivery startDelivery(@PathVariable String id) {
        return deliveryService.startDelivery(id);
    }

    @PutMapping("/{id}/complete")
    public Delivery completeDelivery(@PathVariable String id) {
        return deliveryService.completeDelivery(id);
    }

    @GetMapping("/getPrepared")
    public List<OrderDTO> getPreparedOrders() {
        System.out.println("Fetching prepared orders...");
        return orderClient.getPreparedOrders();
    }
}
//@RestController
//@RequestMapping("/api/deliveries")
//public class DeliveryController {
//
//    private final DeliveryService deliveryService;
//    private final OrderClient orderClient;
//
//    //  Constructor includes OrderClient
//    public DeliveryController(DeliveryService deliveryService, OrderClient orderClient) {
//        this.deliveryService = deliveryService;
//        this.orderClient = orderClient;
//    }
//    @PostMapping("/assign")
//    public Delivery assignDriver(@RequestBody Map<String, Object> request) {
//        Long orderId = Long.valueOf(request.get("orderId").toString());
//        String location = request.get("location").toString();
//        return deliveryService.assignDriver(orderId, location);
//    }
//
//    @GetMapping
//    public List<Delivery> getAllDeliveries() {
//        return deliveryService.getAllDeliveries();
//    }
//
//    @PutMapping("/{id}/status")
//    public Delivery updateStatus(@PathVariable String id, @RequestParam String status) {
//        return deliveryService.updateDeliveryStatus(id, status);
//    }
//    @GetMapping("/getPrepared")
//    public List<OrderDTO> getPreparedOrders() {
//        System.out.println("Fetching prepared orders...");
//        return orderClient.getPreparedOrders();
//        //return List.of(new OrderDTO(1L, "Burger", "PREPARED"));
//    }
//
//
//
//}
