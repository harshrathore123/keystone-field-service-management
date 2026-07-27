package com.keystone.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "work_orders")
@Data
public class WorkOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String workOrderNumber;

    private String title;

    @Column(length = 1000)
    private String description;

    private String priority;

    private String status;

    private String scheduledDate;
    
    private String slaDate;

    private Boolean active;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false)
    @JsonBackReference(value = "customer-workorder")
    private Customer customer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "site_id", nullable = false)
    @JsonBackReference(value = "site-workorder")
    private Site site;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assigned_user_id")
    @JsonBackReference(value = "user-workorder")
    private User assignedUser;

    @OneToMany(mappedBy = "workOrder", cascade = CascadeType.ALL)
    @JsonManagedReference(value = "workorder-partusage")
    private List<PartUsage> partUsages;

    @OneToMany(mappedBy = "workOrder", cascade = CascadeType.ALL)
    @JsonManagedReference(value = "workorder-timelog")
    private List<TimeLog> timeLogs;

    @OneToMany(mappedBy = "workOrder", cascade = CascadeType.ALL)
    @JsonManagedReference(value = "workorder-statushistory")
    private List<StatusHistory> statusHistories;
    

}