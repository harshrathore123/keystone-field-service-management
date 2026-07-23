package com.keystone.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.keystone.entity.WorkOrder;

public interface WorkOrderRepository extends JpaRepository<WorkOrder, Long> {

}