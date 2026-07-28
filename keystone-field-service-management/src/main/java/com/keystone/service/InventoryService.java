package com.keystone.service;

import java.util.List;

import com.keystone.dto.InventoryDTO;

public interface InventoryService {

    InventoryDTO createInventory(InventoryDTO inventoryDTO);

    List<InventoryDTO> getAllInventory();

    InventoryDTO getInventoryById(Long inventoryId);

    InventoryDTO updateInventory(Long inventoryId, InventoryDTO inventoryDTO);

    void deleteInventory(Long inventoryId);
}