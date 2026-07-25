package com.keystone.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SiteDTO {

    private Long id;
    private String siteName;
    private String address;
    private String city;
    private String state;
    private String postalCode;
    private Boolean active;
	private Long customerId;
}