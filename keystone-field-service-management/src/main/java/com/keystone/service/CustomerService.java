package com.keystone.service;

import java.util.List;

import com.keystone.entity.Customer;

public interface CustomerService {

    // Create Customer
    Customer createCustomer(Customer customer);

    // Get All Customers
    List<Customer> getAllCustomers();

    // Get Customer By Id
    Customer getCustomerById(Long id);

    // Update Customer
    Customer updateCustomer(Long id, Customer customer);

    // Delete Customer
    void deleteCustomer(Long id);

}