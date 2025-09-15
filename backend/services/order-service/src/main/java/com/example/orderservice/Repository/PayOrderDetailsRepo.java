package com.example.orderservice.Repository;

import com.example.orderservice.Model.PayOrders;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface PayOrderDetailsRepo extends MongoRepository<PayOrders, String> {
}
