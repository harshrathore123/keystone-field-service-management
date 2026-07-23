package com.keystone.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "parts")
@Data
public class Part {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String partName;

    private String partNumber;

    private String category;

    private Integer quantityInStock;

    private Double unitPrice;

    private Boolean active;

	public Part(Long id, String partName, String partNumber, String category, Integer quantityInStock, Double unitPrice,
			Boolean active) {
		super();
		this.id = id;
		this.partName = partName;
		this.partNumber = partNumber;
		this.category = category;
		this.quantityInStock = quantityInStock;
		this.unitPrice = unitPrice;
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

	public String getPartNumber() {
		return partNumber;
	}

	public void setPartNumber(String partNumber) {
		this.partNumber = partNumber;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public Integer getQuantityInStock() {
		return quantityInStock;
	}

	public void setQuantityInStock(Integer quantityInStock) {
		this.quantityInStock = quantityInStock;
	}

	public Double getUnitPrice() {
		return unitPrice;
	}

	public void setUnitPrice(Double unitPrice) {
		this.unitPrice = unitPrice;
	}

	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	public Part() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public String toString() {
		return "Part [id=" + id + ", partName=" + partName + ", partNumber=" + partNumber + ", category=" + category
				+ ", quantityInStock=" + quantityInStock + ", unitPrice=" + unitPrice + ", active=" + active + "]";
	}
    
    
}