package com.example.user_management.controller;

import com.example.user_management.dto.RegistrationRequestDto;
import com.example.user_management.dto.RestaurantDetailsDto;
import com.example.user_management.dto.UserDto;
import com.example.user_management.model.DriverDetails;
import com.example.user_management.model.RestaurantDetails;
import com.example.user_management.model.User;
import com.example.user_management.repository.DriverDetailsRepository;
import com.example.user_management.repository.RestaurantDetailsRepository;
import com.example.user_management.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/register")
@RequiredArgsConstructor
public class RegistrationController {

    private final UserService userService;
    private final RestaurantDetailsRepository restaurantDetailsRepository;
    private final DriverDetailsRepository driverDetailsRepository;

    @PostMapping
    public String registerUser(@RequestBody RegistrationRequestDto registrationRequest) {
        User user = userService.registerUser(registrationRequest.getUser());

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
        } else if (user.getUserType().name().equals("DRIVER") && registrationRequest.getDriverDetails() != null) {
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

    // ✅ NEW: Registration with logo file upload
    @PostMapping(value = "/restaurant", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public String registerRestaurantWithLogo(
            @RequestPart("user") UserDto userDto,
            @RequestPart("restaurantDetails") RestaurantDetailsDto restaurantDetailsDto,
            @RequestPart("logo") MultipartFile logoFile
    ) throws IOException {

        // Save user
        User user = userService.registerUser(userDto);

        // Save logo file to local filesystem
        String uploadDir = "uploads/logos/";
        Files.createDirectories(Paths.get(uploadDir));

        String uniqueFileName = UUID.randomUUID() + "_" + logoFile.getOriginalFilename();
        Path filePath = Paths.get(uploadDir, uniqueFileName);
        Files.copy(logoFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        // Create and save restaurant details
        RestaurantDetails details = new RestaurantDetails();
        details.setUser(user);
        details.setRestaurantName(restaurantDetailsDto.getRestaurantName());
        details.setRestaurantLocation(restaurantDetailsDto.getRestaurantLocation());
        details.setOwnerName(restaurantDetailsDto.getOwnerName());
        details.setOwnerAddress(restaurantDetailsDto.getOwnerAddress());
        details.setOwnerNIC(restaurantDetailsDto.getOwnerNIC());
        details.setLicenseNumber(restaurantDetailsDto.getLicenseNumber());
        details.setOwnerContact(restaurantDetailsDto.getOwnerContact());
        details.setRestaurantContact(restaurantDetailsDto.getRestaurantContact());
        details.setRestaurantEmail(restaurantDetailsDto.getRestaurantEmail());
        details.setDescription(restaurantDetailsDto.getDescription());
        details.setLogoUrl("/" + uploadDir + uniqueFileName); // Store relative path

        restaurantDetailsRepository.save(details);

        return "Restaurant registered with logo!";
    }
}
