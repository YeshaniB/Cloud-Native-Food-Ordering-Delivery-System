package com.example.user_management.controller;

import com.example.user_management.dto.*;
import com.example.user_management.model.*;
import com.example.user_management.repository.*;
import com.example.user_management.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/register")
@RequiredArgsConstructor
public class RegistrationController {

    private final UserService userService;
    private final RestaurantDetailsRepository restaurantDetailsRepository;
    private final com.example.user_management.repository.DriverDetailsRepository driverDetailsRepository;

    @PostMapping
    public String registerUser(@RequestBody RegistrationRequestDto registrationRequest) {
        // Save User first
        User user = userService.registerUser(registrationRequest.getUser());

        // If RESTAURANT, save restaurantDetails
        if (user.getUserType().name().equals("RESTAURANT") && registrationRequest.getRestaurantDetails() != null) {
            RestaurantDetails details = new RestaurantDetails();
            details.setUser(user);
            details.setRestaurantName(registrationRequest.getRestaurantDetails().getRestaurantName());
            details.setRestaurantLocation(registrationRequest.getRestaurantDetails().getRestaurantLocation());
            details.setOwnerName(registrationRequest.getRestaurantDetails().getOwnerName());
            details.setOwnerAddress(registrationRequest.getRestaurantDetails().getOwnerAddress());
            details.setOwnerNIC(registrationRequest.getRestaurantDetails().getOwnerNIC());
            details.setLicenseNumber(registrationRequest.getRestaurantDetails().getLicenseNumber());
            details.setOwnerContact(registrationRequest.getRestaurantDetails().getOwnerContact());
            details.setRestaurantContact(registrationRequest.getRestaurantDetails().getRestaurantContact());
            details.setRestaurantEmail(registrationRequest.getRestaurantDetails().getRestaurantEmail());
            details.setLogoUrl(registrationRequest.getRestaurantDetails().getLogoUrl());
            details.setDescription(registrationRequest.getRestaurantDetails().getDescription());


            restaurantDetailsRepository.save(details);
        }

        // If DRIVER, save driverDetails
        else if (user.getUserType().name().equals("DRIVER") && registrationRequest.getDriverDetails() != null) {
            DriverDetails details = new DriverDetails();
            details.setUser(user);
            details.setDriverName(registrationRequest.getDriverDetails().getDriverName());
            details.setDriverNIC(registrationRequest.getDriverDetails().getDriverNIC());
            details.setLicenseNumber(registrationRequest.getDriverDetails().getLicenseNumber());
            details.setVehicleNumber(registrationRequest.getDriverDetails().getVehicleNumber());
            details.setLicenseCopyUrl(registrationRequest.getDriverDetails().getLicenseCopyUrl());
            details.setVehicleType(registrationRequest.getDriverDetails().getVehicleType());


            driverDetailsRepository.save(details);
        }

        return "Registration Successful!";
    }
}
