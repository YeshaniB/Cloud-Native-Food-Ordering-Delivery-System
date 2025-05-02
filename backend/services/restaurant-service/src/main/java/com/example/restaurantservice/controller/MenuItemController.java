package com.example.restaurantservice.controller;

import com.example.restaurantservice.dto.OrderDto;
import com.example.restaurantservice.model.MenuItem;
import com.example.restaurantservice.repository.MenuItemRepository;
import com.example.restaurantservice.service.OrderService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Autowired;


import java.io.IOException;
import java.nio.file.*;
import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/menu")
public class MenuItemController {

    @Autowired
    private MenuItemRepository repository;
    private final OrderService orderService;

    public MenuItemController(OrderService orderService) {
        this.orderService = orderService;
    }


    @PostMapping(value = "", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
public MenuItem addMenuItem(@RequestPart("item") String itemString,
                            @RequestPart("image") MultipartFile file) throws IOException {
    // Convert the String to MenuItem object
    ObjectMapper mapper = new ObjectMapper();
    MenuItem item = mapper.readValue(itemString, MenuItem.class);

    String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
    Path path = Paths.get("uploads/" + filename);
    Files.createDirectories(path.getParent());
    Files.write(path, file.getBytes());

    item.setImageUrl(filename);
    return repository.save(item);
}


    @GetMapping
    public List<MenuItem> getAll() {
        return repository.findAll();
    }

    @GetMapping("/available")
    public List<MenuItem> getAvailableItems() {
        return repository.findByAvailableTrue();
    }

    @GetMapping("/restaurant/{restaurantId}")
    public List<MenuItem> getMenuItemsByRestaurant(@PathVariable Long restaurantId) {
        return repository.findByRestaurantId(restaurantId);
    }


    @PutMapping("/{id}")
    public ResponseEntity<MenuItem> update(@PathVariable Long id, @RequestBody MenuItem item) {
        return repository.findById(id)
                .map(existing -> {
                    existing.setName(item.getName());
                    existing.setPrice(item.getPrice());
                    existing.setDescription(item.getDescription());
                    return ResponseEntity.ok(repository.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }


    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repository.deleteById(id);
    }

    @PatchMapping("/{id}/availability")
    public MenuItem toggleAvailability(@PathVariable Long id) {
        MenuItem item = repository.findById(id).orElseThrow();
        item.setAvailable(!item.getAvailable());
        return repository.save(item);
    }

    @GetMapping("/images/{filename}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename) throws IOException {
        Path path = Paths.get("uploads/" + filename);
        Resource resource = new UrlResource(path.toUri());
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(resource);
    }

    @GetMapping("/pendingOrders")
    public List<OrderDto> getPendingOrders() {
        return orderService.getPendingOrders();
    }
}