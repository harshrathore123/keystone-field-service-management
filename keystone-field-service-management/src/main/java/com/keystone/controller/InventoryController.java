package com.keystone.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.keystone.dto.InventoryDTO;
import com.keystone.response.ApiResponse;
import com.keystone.service.InventoryService;

@RestController
@RequestMapping("/api/inventory")
public class InventoryController {

    private final InventoryService inventoryService;

    public InventoryController(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }
    
    @PreAuthorize("hasAnyRole('MANAGER','DISPATCHER')")
    @PostMapping
    public ResponseEntity<ApiResponse<InventoryDTO>> createInventory(
            @RequestBody InventoryDTO inventoryDTO) {

        InventoryDTO savedInventory = inventoryService.createInventory(inventoryDTO);

        ApiResponse<InventoryDTO> response = new ApiResponse<>(
                LocalDateTime.now(),
                HttpStatus.CREATED.value(),
                true,
                "Inventory created successfully.",
                savedInventory);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    
    @PreAuthorize("hasAnyRole('MANAGER','DISPATCHER')")
    @GetMapping
    public ResponseEntity<ApiResponse<List<InventoryDTO>>> getAllInventory() {

        List<InventoryDTO> inventoryList = inventoryService.getAllInventory();

        ApiResponse<List<InventoryDTO>> response = new ApiResponse<>(
                LocalDateTime.now(),
                HttpStatus.OK.value(),
                true,
                "Inventory fetched successfully.",
                inventoryList);

        return ResponseEntity.ok(response);
    }
    
    @PreAuthorize("hasAnyRole('MANAGER','DISPATCHER')")
    @GetMapping("/{inventoryId}")
    public ResponseEntity<ApiResponse<InventoryDTO>> getInventoryById(
            @PathVariable Long inventoryId) {

        InventoryDTO inventory = inventoryService.getInventoryById(inventoryId);

        ApiResponse<InventoryDTO> response = new ApiResponse<>(
                LocalDateTime.now(),
                HttpStatus.OK.value(),
                true,
                "Inventory fetched successfully.",
                inventory);

        return ResponseEntity.ok(response);
    }
    
    @PreAuthorize("hasAnyRole('MANAGER','DISPATCHER')")
    @PutMapping("/{inventoryId}")
    public ResponseEntity<ApiResponse<InventoryDTO>> updateInventory(
            @PathVariable Long inventoryId,
            @RequestBody InventoryDTO inventoryDTO) {

        InventoryDTO updatedInventory =
                inventoryService.updateInventory(inventoryId, inventoryDTO);

        ApiResponse<InventoryDTO> response = new ApiResponse<>(
                LocalDateTime.now(),
                HttpStatus.OK.value(),
                true,
                "Inventory updated successfully.",
                updatedInventory);

        return ResponseEntity.ok(response);
    }
    
    @PreAuthorize("hasAnyRole('MANAGER','DISPATCHER')")
    @DeleteMapping("/{inventoryId}")
    public ResponseEntity<ApiResponse<Void>> deleteInventory(
            @PathVariable Long inventoryId) {

        inventoryService.deleteInventory(inventoryId);

        ApiResponse<Void> response = new ApiResponse<>(
                LocalDateTime.now(),
                HttpStatus.OK.value(),
                true,
                "Inventory deleted successfully.",
                null);

        return ResponseEntity.ok(response);
    }
    
}