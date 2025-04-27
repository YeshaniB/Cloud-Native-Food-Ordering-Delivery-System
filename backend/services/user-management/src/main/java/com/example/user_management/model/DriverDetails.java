package com.example.user_management.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "driver_details")
public class DriverDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    private String driverName;
    private String driverNIC;
    private String licenseNumber;
    private String vehicleNumber;
    private String licenseCopyUrl;
}
