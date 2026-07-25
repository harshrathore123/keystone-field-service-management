package com.keystone.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CustomerDTO {

    private Long id;

    private String customerName;

    private String email;

    private String phoneNumber;

    private String companyName;

    private String address;

    private Boolean active;

}