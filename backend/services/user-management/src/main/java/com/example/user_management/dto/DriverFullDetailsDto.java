package com.example.user_management.dto;

import lombok.Data;

@Data
public class DriverFullDetailsDto {
    private Long userId;
    private String name;
    private String contact;
    private String email;
    private boolean isActivated;

    private String driverName;
    private String driverNIC;
    private String licenseNumber;
    private String vehicleNumber;
    private String licenseCopyUrl;
}
