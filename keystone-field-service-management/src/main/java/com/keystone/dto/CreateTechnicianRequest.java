package com.keystone.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CreateTechnicianRequest {

    @NotBlank(message = "First Name is required")
    private String firstName;

    private String lastName;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Password is required")
    private String password;

    @NotBlank(message = "Phone Number is required")
    @Pattern(
        regexp = "^[0-9]{10}$",
        message = "Phone Number must contain exactly 10 digits"
    )
    private String phoneNumber;

    private Boolean active = true;
}