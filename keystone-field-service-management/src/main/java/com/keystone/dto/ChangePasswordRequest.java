package com.keystone.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChangePasswordRequest {

    @NotBlank(message = "Old Password is required.")
    private String oldPassword;

    @NotBlank(message = "New Password is required.")
    private String newPassword;

    @NotBlank(message = "Confirm Password is required.")
    private String confirmPassword;
}