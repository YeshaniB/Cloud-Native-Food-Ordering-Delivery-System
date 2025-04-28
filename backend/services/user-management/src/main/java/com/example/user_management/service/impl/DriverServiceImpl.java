package com.example.user_management.service.impl;

import com.example.user_management.dto.DriverFullDetailsDto;
import com.example.user_management.model.DriverDetails;
import com.example.user_management.model.User;
import com.example.user_management.repository.DriverDetailsRepository;
import com.example.user_management.repository.UserRepository;
import com.example.user_management.enums.UserType;
import com.example.user_management.service.DriverService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DriverServiceImpl implements DriverService {

    private final UserRepository userRepository;
    private final DriverDetailsRepository driverDetailsRepository;

    @Override
    public List<DriverFullDetailsDto> getAllDriverDetails() {
        List<User> drivers = userRepository.findByUserType(UserType.DRIVER);
        List<DriverFullDetailsDto> result = new ArrayList<>();

        for (User driverUser : drivers) {
            DriverDetails driverDetails = driverDetailsRepository.findByUserId(driverUser.getId())
                    .orElse(null);

            if (driverDetails != null) {
                DriverFullDetailsDto dto = new DriverFullDetailsDto();
                dto.setUserId(driverUser.getId());
                dto.setName(driverUser.getName());
                dto.setContact(driverUser.getContact());
                dto.setEmail(driverUser.getEmail());
                dto.setActivated(driverUser.isActivated());
                dto.setVehicleType(driverDetails.getVehicleType());


                dto.setDriverName(driverDetails.getDriverName());
                dto.setDriverNIC(driverDetails.getDriverNIC());
                dto.setLicenseNumber(driverDetails.getLicenseNumber());
                dto.setVehicleNumber(driverDetails.getVehicleNumber());
                dto.setLicenseCopyUrl(driverDetails.getLicenseCopyUrl());


                result.add(dto);
            }
        }

        return result;
    }

    @Override
    public List<DriverFullDetailsDto> getAllActivatedDriverDetails() {
        List<User> drivers = userRepository.findByUserType(UserType.DRIVER)
                .stream()
                .filter(User::isActivated)  // ✅ Only activated drivers
                .toList();

        List<DriverFullDetailsDto> result = new ArrayList<>();

        for (User driverUser : drivers) {
            DriverDetails driverDetails = driverDetailsRepository.findByUserId(driverUser.getId())
                    .orElse(null);

            if (driverDetails != null) {
                DriverFullDetailsDto dto = new DriverFullDetailsDto();
                dto.setUserId(driverUser.getId());
                dto.setName(driverUser.getName());
                dto.setContact(driverUser.getContact());
                dto.setEmail(driverUser.getEmail());
                dto.setActivated(driverUser.isActivated());

                dto.setDriverName(driverDetails.getDriverName());
                dto.setDriverNIC(driverDetails.getDriverNIC());
                dto.setLicenseNumber(driverDetails.getLicenseNumber());
                dto.setVehicleNumber(driverDetails.getVehicleNumber());
                dto.setLicenseCopyUrl(driverDetails.getLicenseCopyUrl());
                dto.setVehicleType(driverDetails.getVehicleType());

                result.add(dto);
            }
        }

        return result;
    }

}
