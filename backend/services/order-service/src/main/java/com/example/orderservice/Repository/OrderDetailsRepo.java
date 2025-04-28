package com.example.orderservice.Repository;

import com.example.orderservice.Model.OrderDetails;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface OrderDetailsRepo extends MongoRepository<OrderDetails, String> {
    List<OrderDetails> findByStatus(String status);
}
