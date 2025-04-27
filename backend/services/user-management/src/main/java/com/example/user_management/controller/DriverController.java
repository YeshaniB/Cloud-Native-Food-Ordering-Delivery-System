package com.example.user_management.controller;

import com.example.user_management.dto.DriverFullDetailsDto;
import com.example.user_management.service.DriverService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/drivers")
@RequiredArgsConstructor
public class DriverController {

    private final DriverService driverService;

    @GetMapping
    public List<DriverFullDetailsDto> getAllDrivers() {
        return driverService.getAllDriverDetails();
    }
}
