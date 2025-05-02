package com.example.orderservice.Repository;

import com.example.orderservice.Interfaces.StatusCountProjection;
import com.example.orderservice.Model.OrderDetails;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface OrderDetailsRepo extends MongoRepository<OrderDetails, String> {

    @Aggregation(pipeline = {
            "{ $group: { _id: '$status', count: { $sum: 1 } } }",
            "{ $project: { status: '$_id', count: 1, _id: 0 } }"
    })
    List<StatusCountProjection> countOrdersByStatus();
    List<OrderDetails> findByStatus(String status);
}
