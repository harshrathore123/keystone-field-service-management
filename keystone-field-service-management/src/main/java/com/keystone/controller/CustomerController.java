package com.keystone.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.RequestParam;

import com.keystone.dto.CustomerDTO;
import com.keystone.response.ApiResponse;
import com.keystone.service.CustomerService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    // Create Customer
    @PostMapping
    public ResponseEntity<ApiResponse<CustomerDTO>> createCustomer(
            @Valid @RequestBody CustomerDTO customerDTO) {

        CustomerDTO customer = customerService.createCustomer(customerDTO);

        ApiResponse<CustomerDTO> response = new ApiResponse<>(
                LocalDateTime.now(),
                HttpStatus.CREATED.value(),
                true,
                "Customer created successfully.",
                customer);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // Get All Customers
    @GetMapping
    public ResponseEntity<ApiResponse<List<CustomerDTO>>> getAllCustomers() {

        List<CustomerDTO> customers = customerService.getAllCustomers();

        ApiResponse<List<CustomerDTO>> response = new ApiResponse<>(
                LocalDateTime.now(),
                HttpStatus.OK.value(),
                true,
                "Customers fetched successfully.",
                customers);

        return ResponseEntity.ok(response);
    }

    // Get Customer By Id
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CustomerDTO>> getCustomerById(
            @PathVariable Long id) {

        CustomerDTO customer = customerService.getCustomerById(id);

        ApiResponse<CustomerDTO> response = new ApiResponse<>(
                LocalDateTime.now(),
                HttpStatus.OK.value(),
                true,
                "Customer fetched successfully.",
                customer);

        return ResponseEntity.ok(response);
    }

    // Update Customer
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<CustomerDTO>> updateCustomer(
            @PathVariable Long id,
            @Valid @RequestBody CustomerDTO customerDTO) {

        CustomerDTO customer = customerService.updateCustomer(id, customerDTO);

        ApiResponse<CustomerDTO> response = new ApiResponse<>(
                LocalDateTime.now(),
                HttpStatus.OK.value(),
                true,
                "Customer updated successfully.",
                customer);

        return ResponseEntity.ok(response);
    }

    // Delete Customer
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteCustomer(
            @PathVariable Long id) {

        customerService.deleteCustomer(id);

        ApiResponse<Void> response = new ApiResponse<>(
                LocalDateTime.now(),
                HttpStatus.OK.value(),
                true,
                "Customer deleted successfully.",
                null);

        return ResponseEntity.ok(response);
    }
    
 // Search Customers
    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<CustomerDTO>>> searchCustomers(
            @RequestParam String keyword) {

        List<CustomerDTO> customers = customerService.searchCustomers(keyword);

        ApiResponse<List<CustomerDTO>> response = new ApiResponse<>(
                LocalDateTime.now(),
                HttpStatus.OK.value(),
                true,
                "Customers fetched successfully.",
                customers);

        return ResponseEntity.ok(response);
    }
    
 // Get Customers With Pagination
    @GetMapping("/page")
    public ResponseEntity<ApiResponse<Page<CustomerDTO>>> getCustomersWithPagination(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {

        Pageable pageable = PageRequest.of(page, size);

        Page<CustomerDTO> customers = customerService.getCustomersWithPagination(pageable);

        ApiResponse<Page<CustomerDTO>> response = new ApiResponse<>(
                LocalDateTime.now(),
                HttpStatus.OK.value(),
                true,
                "Customers fetched successfully.",
                customers);

        return ResponseEntity.ok(response);
    }
}