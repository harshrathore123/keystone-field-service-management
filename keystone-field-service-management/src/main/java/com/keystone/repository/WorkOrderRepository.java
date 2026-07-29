package com.keystone.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.keystone.entity.Customer;
import com.keystone.entity.Site;
import com.keystone.entity.User;
import com.keystone.entity.WorkOrder;

public interface WorkOrderRepository extends JpaRepository<WorkOrder, Long> {

    // Search Work Order by Title
    List<WorkOrder> findByTitleContainingIgnoreCase(String keyword);

    // Get all work orders assigned to a technician
    List<WorkOrder> findByAssignedUser(User assignedUser);

    // Dashboard Counts
    long countByStatus(String status);

    // Technician Performance
    long countByAssignedUser(User assignedUser);

    long countByAssignedUserAndStatus(User assignedUser, String status);

    // Site Reports
    long countBySite(Site site);

    long countBySiteAndStatus(Site site, String status);

    // Customer Portal
    List<WorkOrder> findByCustomer(Customer customer);
}