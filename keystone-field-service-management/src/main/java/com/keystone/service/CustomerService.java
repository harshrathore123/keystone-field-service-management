package com.keystone.service;

import java.util.List;

import com.keystone.dto.CustomerDTO;

public interface CustomerService {

    // Create Customer
    CustomerDTO createCustomer(CustomerDTO customerDTO);

    // Get All Customers
    List<CustomerDTO> getAllCustomers();

    // Get Customer By Id
    CustomerDTO getCustomerById(Long id);

    // Update Customer
    CustomerDTO updateCustomer(Long id, CustomerDTO customerDTO);

    // Delete Customer
    void deleteCustomer(Long id);

}