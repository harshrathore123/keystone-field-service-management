package com.keystone.dto;

public class InventoryDTO {

    private Long id;
    private String partName;
    private String partCode;
    private String description;
    private Double unitPrice;
    private Integer quantityInStock;
    private Integer minimumStock;
    private Boolean active;

    public InventoryDTO() {
    }

    public InventoryDTO(Long id, String partName, String partCode,
                        String description, Double unitPrice,
                        Integer quantityInStock, Integer minimumStock,
                        Boolean active) {
        this.id = id;
        this.partName = partName;
        this.partCode = partCode;
        this.description = description;
        this.unitPrice = unitPrice;
        this.quantityInStock = quantityInStock;
        this.minimumStock = minimumStock;
        this.active = active;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPartName() {
        return partName;
    }

    public void setPartName(String partName) {
        this.partName = partName;
    }

    public String getPartCode() {
        return partCode;
    }

    public void setPartCode(String partCode) {
        this.partCode = partCode;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(Double unitPrice) {
        this.unitPrice = unitPrice;
    }

    public Integer getQuantityInStock() {
        return quantityInStock;
    }

    public void setQuantityInStock(Integer quantityInStock) {
        this.quantityInStock = quantityInStock;
    }

    public Integer getMinimumStock() {
        return minimumStock;
    }

    public void setMinimumStock(Integer minimumStock) {
        this.minimumStock = minimumStock;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }
}