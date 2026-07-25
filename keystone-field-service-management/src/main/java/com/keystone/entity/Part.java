package com.keystone.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
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

    @OneToMany(mappedBy = "part", cascade = CascadeType.ALL)
    @JsonManagedReference(value = "part-partusage")
    private List<PartUsage> partUsages;
}