package com.keystone.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.keystone.dto.ChangePasswordRequest;
import com.keystone.dto.CreateTechnicianRequest;
import com.keystone.dto.UpdateTechnicianRequest;
import com.keystone.dto.UserDTO;
import com.keystone.response.ApiResponse;
import com.keystone.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Create User (Manager Only)
    @PostMapping
    @PreAuthorize("hasRole('MANAGER')")
    public ResponseEntity<ApiResponse<UserDTO>> saveUser(
            @Valid @RequestBody UserDTO userDTO) {

        UserDTO user = userService.saveUser(userDTO);

        ApiResponse<UserDTO> response = new ApiResponse<>(
                LocalDateTime.now(),
                HttpStatus.CREATED.value(),
                true,
                "User created successfully.",
                user);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // Get All Users (Manager Only)
    @GetMapping
    @PreAuthorize("hasRole('MANAGER')")
    public ResponseEntity<ApiResponse<List<UserDTO>>> getAllUsers() {

        List<UserDTO> users = userService.getAllUsers();

        ApiResponse<List<UserDTO>> response = new ApiResponse<>(
                LocalDateTime.now(),
                HttpStatus.OK.value(),
                true,
                "Users fetched successfully.",
                users);

        return ResponseEntity.ok(response);
    }

    // Get User By Id (Manager Only)
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('MANAGER')")
    public ResponseEntity<ApiResponse<UserDTO>> getUser(
            @PathVariable Long id) {

        UserDTO user = userService.getUser(id);

        ApiResponse<UserDTO> response = new ApiResponse<>(
                LocalDateTime.now(),
                HttpStatus.OK.value(),
                true,
                "User fetched successfully.",
                user);

        return ResponseEntity.ok(response);
    }

    // Update User (Manager Only)
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('MANAGER')")
    public ResponseEntity<ApiResponse<UserDTO>> updateUser(
            @PathVariable Long id,
            @Valid @RequestBody UserDTO userDTO) {

        UserDTO updatedUser = userService.updateUser(id, userDTO);

        ApiResponse<UserDTO> response = new ApiResponse<>(
                LocalDateTime.now(),
                HttpStatus.OK.value(),
                true,
                "User updated successfully.",
                updatedUser);

        return ResponseEntity.ok(response);
    }

    // Delete User (Manager Only)
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('MANAGER')")
    public ResponseEntity<ApiResponse<Void>> deleteUser(
            @PathVariable Long id) {

        userService.deleteUser(id);

        ApiResponse<Void> response = new ApiResponse<>(
                LocalDateTime.now(),
                HttpStatus.OK.value(),
                true,
                "User deleted successfully.",
                null);

        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/technicians")
    @PreAuthorize("hasAnyRole('MANAGER','DISPATCHER')")
    public ResponseEntity<ApiResponse<List<UserDTO>>> getAllTechnicians() {

        List<UserDTO> technicians = userService.getAllTechnicians();

        ApiResponse<List<UserDTO>> response = new ApiResponse<>(
                LocalDateTime.now(),
                HttpStatus.OK.value(),
                true,
                "Technicians fetched successfully.",
                technicians);

        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/technicians")
    @PreAuthorize("hasRole('MANAGER')")
    public ResponseEntity<ApiResponse<UserDTO>> createTechnician(
            @Valid @RequestBody CreateTechnicianRequest request) {

    	UserDTO technician = userService.createTechnician(request);

        ApiResponse<UserDTO> response = new ApiResponse<>(
                LocalDateTime.now(),
                HttpStatus.CREATED.value(),
                true,
                "Technician created successfully.",
                technician);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    
    @PutMapping("/technicians/{id}")
    @PreAuthorize("hasRole('MANAGER')")
    public ResponseEntity<ApiResponse<UserDTO>> updateTechnician(
            @PathVariable Long id,
            @Valid @RequestBody UpdateTechnicianRequest request) {

        UserDTO technician = userService.updateTechnician(id, request);

        ApiResponse<UserDTO> response = new ApiResponse<>(
                LocalDateTime.now(),
                HttpStatus.OK.value(),
                true,
                "Technician updated successfully.",
                technician);

        return ResponseEntity.ok(response);
    }
    
    @DeleteMapping("/technicians/{id}")
    @PreAuthorize("hasRole('MANAGER')")
    public ResponseEntity<ApiResponse<Void>> deleteTechnician(
            @PathVariable Long id) {

        userService.deleteTechnician(id);

        ApiResponse<Void> response = new ApiResponse<>(
                LocalDateTime.now(),
                HttpStatus.OK.value(),
                true,
                "Technician deleted successfully.",
                null);

        return ResponseEntity.ok(response);
    }
    
    @PutMapping("/change-password")
    @PreAuthorize("hasAnyRole('MANAGER','TECHNICIAN')")
    public ResponseEntity<String> changePassword(
            @RequestBody ChangePasswordRequest request) {

        userService.changePassword(request);

        return ResponseEntity.ok("Password changed successfully.");
    }
}