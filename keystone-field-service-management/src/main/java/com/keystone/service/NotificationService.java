package com.keystone.service;

import java.util.List;

import com.keystone.dto.NotificationDTO;

public interface NotificationService {

    NotificationDTO createNotification(NotificationDTO notificationDTO);

    NotificationDTO getNotificationById(Long id);

    List<NotificationDTO> getAllNotifications();

    List<NotificationDTO> getNotificationsByUser(Long userId);

    NotificationDTO markAsRead(Long id);

    void deleteNotification(Long id);

}