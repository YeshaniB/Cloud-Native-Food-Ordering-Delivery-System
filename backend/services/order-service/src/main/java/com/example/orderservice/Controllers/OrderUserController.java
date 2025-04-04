package com.example.orderservice.Controllers;

import com.example.orderservice.Model.OrderDetails;
import com.example.orderservice.Repository.OrderDetailsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class OrderUserController {

    @Autowired
    private OrderDetailsRepo orderDetailsRepo;

    @PostMapping("/addOrderDetails")
    public void addOrder(@RequestBody List<OrderDetails> orderDetails) {
        orderDetailsRepo.saveAll(orderDetails);
        if(orderDetailsRepo != null){
            System.out.println(orderDetailsRepo);
        }
    }


    @GetMapping("/getOrderDetails/{id}")
    public OrderDetails getStudent(@PathVariable String id) {
        return orderDetailsRepo.findById(id).orElse(null);
    }


    @GetMapping("/fetchStudents")
    public List<OrderDetails> fetchStudents() {
        return orderDetailsRepo.findAll();
    }


}
