package com.keystone.mapper;

import com.keystone.dto.CustomerDTO;
import com.keystone.entity.Customer;

public class CustomerMapper {

    // Convert Entity to DTO
    public static CustomerDTO toDTO(Customer customer) {

        if (customer == null) {
            return null;
        }

        CustomerDTO dto = new CustomerDTO();

        dto.setId(customer.getId());
        dto.setCustomerName(customer.getCustomerName());
        dto.setEmail(customer.getEmail());
        dto.setPhoneNumber(customer.getPhoneNumber());
        dto.setCompanyName(customer.getCompanyName());
        dto.setAddress(customer.getAddress());
        dto.setActive(customer.getActive());

        return dto;
    }

    // Convert DTO to Entity
    public static Customer toEntity(CustomerDTO dto) {

        if (dto == null) {
            return null;
        }

        Customer customer = new Customer();

        customer.setId(dto.getId());
        customer.setCustomerName(dto.getCustomerName());
        customer.setEmail(dto.getEmail());
        customer.setPhoneNumber(dto.getPhoneNumber());
        customer.setCompanyName(dto.getCompanyName());
        customer.setAddress(dto.getAddress());
        customer.setActive(dto.getActive());

        return customer;
    }
}