package com.example.delivery_service.repository;

import com.example.delivery_service.model.Delivery;
import org.springframework.data.geo.Distance;
import org.springframework.data.geo.Point;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DeliveryRepository extends MongoRepository<Delivery, String> {

     Optional<Delivery> findByOrderId(String orderId);
     List<Delivery> findByStatus(String status);
     List<Delivery> findByDriverId(String driverId);
     List<Delivery> findByDeliveryLocationNear(Point location, Distance distance);

}
