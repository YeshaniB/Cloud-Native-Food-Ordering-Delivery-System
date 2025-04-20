package com.example.orderservice.Controllers;

import com.example.orderservice.Model.OrderDetails;
import com.example.orderservice.Repository.OrderDetailsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.bson.types.Binary;


import java.util.Arrays;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")

@RestController
public class OrderUserController {

    @Autowired
    private OrderDetailsRepo orderDetailsRepo;

    @PostMapping("/addOrderDetails")
    public ResponseEntity<String> addOrder(
//            @RequestParam("customerId") String customerId,
            @RequestParam("orderDate") String orderDate,
            @RequestParam("customerName") String customerName,
            @RequestParam("customerAddress") String customerAddress,
            @RequestParam("orderName") String[] orderNames,
            @RequestParam("quantity") String[] quantities,
            @RequestParam("price") String[] prices,
//            @RequestParam("totalPrice") String totalPrice,
            @RequestParam("image") MultipartFile imageFile
    ) throws Exception {

        OrderDetails order = new OrderDetails();
        String nextOrderId = generateNextOrderId();
        order.setOrderId(nextOrderId);
//        order.setCustomerId(customerId);
        order.setOrderDate(orderDate);
        order.setCustomerName(customerName);
        order.setCustomerAddress(customerAddress);
        order.setOrderName(Arrays.asList(orderNames));
        order.setQuantity(Arrays.asList(quantities));
        order.setPrice(Arrays.asList(prices));
//        order.setTotalPrice(totalPrice);

        // Save image as Binary
        order.setImage(new Binary(imageFile.getBytes()));

        orderDetailsRepo.save(order);

        return ResponseEntity.ok("Order with image saved successfully!");
    }


    @GetMapping("/getOrderDetails/{id}")
    public OrderDetails getStudent(@PathVariable String id) {
        return orderDetailsRepo.findById(id).orElse(null);
    }


    @GetMapping("/fetchStudents")
    public List<OrderDetails> fetchStudents() {
        return orderDetailsRepo.findAll();
    }

    private String generateNextOrderId() {
        List<OrderDetails> allOrders = orderDetailsRepo.findAll();

        int max = 0;
        for (OrderDetails o : allOrders) {
            String id = o.getOrderId(); // example: ORD00042
            if (id != null && id.startsWith("ORD")) {
                try {
                    int number = Integer.parseInt(id.substring(3)); // get number part
                    if (number > max) max = number;
                } catch (NumberFormatException e) {
                    // ignore non-numeric suffixes
                }
            }
        }

        int next = max + 1;
        return String.format("ORD%05d", next); // returns like ORD00001
    }



}

