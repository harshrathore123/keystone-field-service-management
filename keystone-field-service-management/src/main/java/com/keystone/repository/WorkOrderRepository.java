package com.keystone.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.keystone.entity.User;
import com.keystone.entity.WorkOrder;

public interface WorkOrderRepository extends JpaRepository<WorkOrder, Long> {

    // Search Work Order by Title
    List<WorkOrder> findByTitleContainingIgnoreCase(String keyword);

    // Get all work orders assigned to a technician
    List<WorkOrder> findByAssignedUser(User assignedUser);

    long countByStatus(String status);
}