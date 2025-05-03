package com.example.delivery_service.repository;

import com.example.delivery_service.model.Driver;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DriverRepository extends MongoRepository<Driver, String> {

    Optional<Driver> findFirstByStatus(String status);
    List<Driver> findByStatus(String status);
    Optional<Driver> findByName(String name);
    //old
    List<Driver> findByStatusAndLocation(String status, String location);



}

//default List<Driver> findAvailableDriversByLocation(String location) {
//    return findByStatusAndLocation("Available", location);
//}