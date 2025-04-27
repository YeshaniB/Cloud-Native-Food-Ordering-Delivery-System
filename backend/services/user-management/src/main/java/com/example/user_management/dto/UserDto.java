package com.example.user_management.dto;

import com.example.user_management.enums.UserType;
import lombok.Data;

@Data
public class UserDto {
    private String name;
    private String contact;
    private String email;
    private UserType userType;
    private String password;
}
