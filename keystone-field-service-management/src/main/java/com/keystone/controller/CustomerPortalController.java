package com.keystone.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.keystone.dto.CustomerRequestDTO;
import com.keystone.dto.WorkOrderDTO;
import com.keystone.service.CustomerPortalService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/customer")
@RequiredArgsConstructor
public class CustomerPortalController {

    private final CustomerPortalService customerPortalService;

    @PostMapping("/request")
    public ResponseEntity<WorkOrderDTO> raiseServiceRequest(
            @Valid @RequestBody CustomerRequestDTO requestDTO) {

        WorkOrderDTO response =
                customerPortalService.raiseServiceRequest(requestDTO);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}