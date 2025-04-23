package com.example.restaurantservice.service;

import  com.example.restaurantservice.model.MenuItem;
import com.example.restaurantservice.repository.MenuItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MenuItemService {

    @Autowired
    private MenuItemRepository repo;

    public List<MenuItem> getAllItems() {
        return repo.findAll();
    }

    public MenuItem getItem(Long id) {
        return repo.findById(id).orElse(null);
    }

    public MenuItem save(MenuItem item) {
        return repo.save(item);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}