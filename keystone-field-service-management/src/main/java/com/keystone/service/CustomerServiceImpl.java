package com.keystone.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.keystone.dto.CustomerDTO;
import com.keystone.entity.Customer;
import com.keystone.exception.ResourceNotFoundException;
import com.keystone.mapper.CustomerMapper;
import com.keystone.repository.CustomerRepository;

@Service
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;

    public CustomerServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    public CustomerDTO createCustomer(CustomerDTO customerDTO) {

        Customer customer = CustomerMapper.toEntity(customerDTO);

        Customer savedCustomer = customerRepository.save(customer);

        return CustomerMapper.toDTO(savedCustomer);
    }

    @Override
    public List<CustomerDTO> getAllCustomers() {

        return customerRepository.findAll()
                .stream()
                .map(CustomerMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public CustomerDTO getCustomerById(Long id) {

        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Customer not found with id : " + id));

        return CustomerMapper.toDTO(customer);
    }

    @Override
    public CustomerDTO updateCustomer(Long id, CustomerDTO customerDTO) {

        Customer existingCustomer = customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Customer not found with id : " + id));

        existingCustomer.setCustomerName(customerDTO.getCustomerName());
        existingCustomer.setEmail(customerDTO.getEmail());
        existingCustomer.setPhoneNumber(customerDTO.getPhoneNumber());
        existingCustomer.setCompanyName(customerDTO.getCompanyName());
        existingCustomer.setAddress(customerDTO.getAddress());
        existingCustomer.setActive(customerDTO.getActive());

        Customer updatedCustomer = customerRepository.save(existingCustomer);

        return CustomerMapper.toDTO(updatedCustomer);
    }

    @Override
    public void deleteCustomer(Long id) {

        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Customer not found with id : " + id));

        customerRepository.delete(customer);
    }
    
    @Override
    public List<CustomerDTO> searchCustomers(String keyword) {

        return customerRepository.findByCustomerNameContainingIgnoreCase(keyword)
                .stream()
                .map(CustomerMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Page<CustomerDTO> getCustomersWithPagination(Pageable pageable) {

        return customerRepository.findAll(pageable)
                .map(CustomerMapper::toDTO);
    }

}