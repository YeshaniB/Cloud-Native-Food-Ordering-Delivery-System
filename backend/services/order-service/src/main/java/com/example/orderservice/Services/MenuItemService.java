//package com.example.orderservice.Services;
//
//import com.example.orderservice.DTO.RestaurantDTO;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.awt.*;
//import java.util.List;
//
//@Service
//public class MenuItemService {
//
//    @Autowired
//    private RestaurantClinet repo;
//
//
//    public MenuItem getItem(Long id) {
//        return repo.findById(id).orElse(null);
//    }
//
//    public MenuItem save(MenuItem item) {
//        return repo.save(item);
//    }
//
//    public void delete(Long id) {
//        repo.deleteById(id);
//    }
//}
