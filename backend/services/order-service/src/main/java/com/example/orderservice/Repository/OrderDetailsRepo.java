package com.example.orderservice.Repository;

import com.example.orderservice.Model.OrderDetails;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OrderDetailsRepo extends MongoRepository<OrderDetails, String> {
}
