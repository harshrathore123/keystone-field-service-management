package com.keystone.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "part_usage")
@Data
public class PartUsage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String partName;

    private Integer quantityUsed;

    private String usedDate;

    private String remarks;

	public PartUsage(Long id, String partName, Integer quantityUsed, String usedDate, String remarks) {
		super();
		this.id = id;
		this.partName = partName;
		this.quantityUsed = quantityUsed;
		this.usedDate = usedDate;
		this.remarks = remarks;
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

	public Integer getQuantityUsed() {
		return quantityUsed;
	}

	public void setQuantityUsed(Integer quantityUsed) {
		this.quantityUsed = quantityUsed;
	}

	public String getUsedDate() {
		return usedDate;
	}

	public void setUsedDate(String usedDate) {
		this.usedDate = usedDate;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public PartUsage() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public String toString() {
		return "PartUsage [id=" + id + ", partName=" + partName + ", quantityUsed=" + quantityUsed + ", usedDate="
				+ usedDate + ", remarks=" + remarks + "]";
	}
    
    
}