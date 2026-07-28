package com.keystone.mapper;

import com.keystone.dto.NotificationDTO;
import com.keystone.entity.Notification;
import com.keystone.entity.User;
import com.keystone.entity.WorkOrder;

public class NotificationMapper {

    private NotificationMapper() {

    }

    public static Notification toEntity(NotificationDTO dto) {

        if (dto == null) {
            return null;
        }

        Notification notification = new Notification();

        notification.setId(dto.getId());
        notification.setTitle(dto.getTitle());
        notification.setMessage(dto.getMessage());
        notification.setIsRead(dto.getIsRead());
        notification.setCreatedAt(dto.getCreatedAt());

        if (dto.getUserId() != null) {

            User user = new User();
            user.setId(dto.getUserId());
            notification.setUser(user);

        }

        if (dto.getWorkOrderId() != null) {

            WorkOrder workOrder = new WorkOrder();
            workOrder.setId(dto.getWorkOrderId());
            notification.setWorkOrder(workOrder);

        }

        return notification;

    }

    public static NotificationDTO toDTO(Notification notification) {

        if (notification == null) {
            return null;
        }

        NotificationDTO dto = new NotificationDTO();

        dto.setId(notification.getId());
        dto.setTitle(notification.getTitle());
        dto.setMessage(notification.getMessage());
        dto.setIsRead(notification.getIsRead());
        dto.setCreatedAt(notification.getCreatedAt());

        if (notification.getUser() != null) {
            dto.setUserId(notification.getUser().getId());
        }

        if (notification.getWorkOrder() != null) {
            dto.setWorkOrderId(notification.getWorkOrder().getId());
        }

        return dto;

    }

}