package com.keystone.mapper;

import com.keystone.dto.InventoryDTO;
import com.keystone.entity.Inventory;

public class InventoryMapper {

    public static InventoryDTO toDTO(Inventory inventory) {

        if (inventory == null) {
            return null;
        }

        InventoryDTO dto = new InventoryDTO();

        dto.setId(inventory.getId());
        dto.setPartName(inventory.getPartName());
        dto.setPartCode(inventory.getPartCode());
        dto.setDescription(inventory.getDescription());
        dto.setUnitPrice(inventory.getUnitPrice());
        dto.setQuantityInStock(inventory.getQuantityInStock());
        dto.setMinimumStock(inventory.getMinimumStock());
        dto.setActive(inventory.getActive());

        return dto;
    }

    public static Inventory toEntity(InventoryDTO dto) {

        if (dto == null) {
            return null;
        }

        Inventory inventory = new Inventory();

        inventory.setId(dto.getId());
        inventory.setPartName(dto.getPartName());
        inventory.setPartCode(dto.getPartCode());
        inventory.setDescription(dto.getDescription());
        inventory.setUnitPrice(dto.getUnitPrice());
        inventory.setQuantityInStock(dto.getQuantityInStock());
        inventory.setMinimumStock(dto.getMinimumStock());
        inventory.setActive(dto.getActive());

        return inventory;
    }
}