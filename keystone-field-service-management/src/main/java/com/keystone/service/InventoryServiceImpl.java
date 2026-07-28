package com.keystone.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.keystone.dto.InventoryDTO;
import com.keystone.entity.Inventory;
import com.keystone.exception.ResourceNotFoundException;
import com.keystone.mapper.InventoryMapper;
import com.keystone.repository.InventoryRepository;

@Service
public class InventoryServiceImpl implements InventoryService {

    private final InventoryRepository inventoryRepository;

    public InventoryServiceImpl(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    @Override
    public InventoryDTO createInventory(InventoryDTO inventoryDTO) {

        Inventory inventory = InventoryMapper.toEntity(inventoryDTO);

        Inventory savedInventory = inventoryRepository.save(inventory);

        return InventoryMapper.toDTO(savedInventory);
    }

    @Override
    public List<InventoryDTO> getAllInventory() {

        return inventoryRepository.findAll()
                .stream()
                .map(InventoryMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public InventoryDTO getInventoryById(Long inventoryId) {

        Inventory inventory = inventoryRepository.findById(inventoryId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Inventory not found with id : " + inventoryId));

        return InventoryMapper.toDTO(inventory);
    }

    @Override
    public InventoryDTO updateInventory(Long inventoryId, InventoryDTO inventoryDTO) {

        Inventory existingInventory = inventoryRepository.findById(inventoryId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Inventory not found with id : " + inventoryId));

        existingInventory.setPartName(inventoryDTO.getPartName());
        existingInventory.setPartCode(inventoryDTO.getPartCode());
        existingInventory.setDescription(inventoryDTO.getDescription());
        existingInventory.setUnitPrice(inventoryDTO.getUnitPrice());
        existingInventory.setQuantityInStock(inventoryDTO.getQuantityInStock());
        existingInventory.setMinimumStock(inventoryDTO.getMinimumStock());
        existingInventory.setActive(inventoryDTO.getActive());

        Inventory updatedInventory = inventoryRepository.save(existingInventory);

        return InventoryMapper.toDTO(updatedInventory);
    }
   
    @Override
    public void deleteInventory(Long inventoryId) {

        Inventory inventory = inventoryRepository.findById(inventoryId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Inventory not found with id : " + inventoryId));

        inventoryRepository.delete(inventory);
    }
    

}