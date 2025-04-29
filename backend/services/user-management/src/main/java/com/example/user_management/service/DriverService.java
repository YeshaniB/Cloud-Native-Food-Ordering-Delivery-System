package com.example.user_management.service;

import com.example.user_management.dto.DriverFullDetailsDto;
import java.util.List;

public interface DriverService {
    List<DriverFullDetailsDto> getAllDriverDetails();
}
