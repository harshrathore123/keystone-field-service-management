package com.keystone.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PartDTO {

    private Long id;

    private String partName;

    private String partNumber;

    private String category;

    private Integer quantityInStock;

    private Double unitPrice;

    private Boolean active;
}