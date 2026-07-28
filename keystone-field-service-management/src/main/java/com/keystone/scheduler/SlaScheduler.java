package com.keystone.scheduler;

import java.time.LocalDate;
import java.util.List;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.keystone.entity.Notification;
import com.keystone.entity.WorkOrder;
import com.keystone.repository.NotificationRepository;
import com.keystone.repository.WorkOrderRepository;

@Component
public class SlaScheduler {

    private final WorkOrderRepository workOrderRepository;
    private final NotificationRepository notificationRepository;

    public SlaScheduler(WorkOrderRepository workOrderRepository,
                        NotificationRepository notificationRepository) {
        this.workOrderRepository = workOrderRepository;
        this.notificationRepository = notificationRepository;
    }

    @Scheduled(cron = "0 0 9 * * ?")
    public void monitorSla() {

        List<WorkOrder> workOrders = workOrderRepository.findAll();

        for (WorkOrder workOrder : workOrders) {

        	if (workOrder.getSlaDate() != null
        	        && !"COMPLETED".equalsIgnoreCase(workOrder.getStatus())
        	        && LocalDate.parse(workOrder.getSlaDate()).isBefore(LocalDate.now())) {

        	    // Check if notification already exists
        	    if (!notificationRepository.existsByWorkOrder(workOrder)) {

        	        Notification notification = new Notification();
        	        notification.setTitle("SLA Breached");
        	        notification.setMessage("Work Order " + workOrder.getWorkOrderNumber() + " has crossed its SLA due date.");
        	        notification.setCreatedAt(java.time.LocalDateTime.now());
        	        notification.setIsRead(false);
        	        notification.setUser(workOrder.getAssignedUser());
        	        notification.setWorkOrder(workOrder);

        	        notificationRepository.save(notification);
        	    }
        	}
        }
    }
}