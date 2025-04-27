package com.example.user_management.dto;

import lombok.Data;

@Data
public class DriverDetailsDto {
    private String driverName;
    private String driverNIC;
    private String licenseNumber;
    private String vehicleNumber;
    private String licenseCopyUrl;
}
