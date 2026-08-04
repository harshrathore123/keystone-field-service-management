package com.keystone.dto;

import com.keystone.enums.Role;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {

    private String token;

    private String message;

    private Role role;

    private String firstName;

    private String lastName;

    private String email;

    private String phoneNumber;
}