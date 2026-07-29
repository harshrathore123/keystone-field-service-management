package com.keystone.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.keystone.entity.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    // Search by Customer Name
    List<Customer> findByCustomerNameContainingIgnoreCase(String customerName);

    // Search by Company Name
    List<Customer> findByCompanyNameContainingIgnoreCase(String companyName);

    // Search by Email
    List<Customer> findByEmailContainingIgnoreCase(String email);

    // Search by Active Status
    List<Customer> findByActive(Boolean active);

    // Find Customer by Exact Email
    Optional<Customer> findByEmail(String email);

}