package com.keystone.dto;

import com.keystone.enums.Role;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {

    private String token;
    private String message;
    private Role role;
}