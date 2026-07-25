package com.keystone.mapper;

import com.keystone.dto.PartDTO;
import com.keystone.entity.Part;

public class PartMapper {

    // Convert Entity to DTO
    public static PartDTO toDTO(Part part) {

        if (part == null) {
            return null;
        }

        PartDTO dto = new PartDTO();

        dto.setId(part.getId());
        dto.setPartName(part.getPartName());
        dto.setPartNumber(part.getPartNumber());
        dto.setCategory(part.getCategory());
        dto.setQuantityInStock(part.getQuantityInStock());
        dto.setUnitPrice(part.getUnitPrice());
        dto.setActive(part.getActive());

        return dto;
    }

    // Convert DTO to Entity
    public static Part toEntity(PartDTO dto) {

        if (dto == null) {
            return null;
        }

        Part part = new Part();

        part.setId(dto.getId());
        part.setPartName(dto.getPartName());
        part.setPartNumber(dto.getPartNumber());
        part.setCategory(dto.getCategory());
        part.setQuantityInStock(dto.getQuantityInStock());
        part.setUnitPrice(dto.getUnitPrice());
        part.setActive(dto.getActive());

        return part;
    }
}