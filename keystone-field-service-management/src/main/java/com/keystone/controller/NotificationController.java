package com.keystone.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.keystone.dto.NotificationDTO;
import com.keystone.response.ApiResponse;
import com.keystone.service.NotificationService;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    // Create Notification
    @PreAuthorize("hasAnyRole('MANAGER','DISPATCHER')")
    @PostMapping
    public ResponseEntity<ApiResponse<NotificationDTO>> createNotification(
            @RequestBody NotificationDTO notificationDTO) {

        NotificationDTO savedNotification =
                notificationService.createNotification(notificationDTO);

        ApiResponse<NotificationDTO> response =
                new ApiResponse<>(
                        LocalDateTime.now(),
                        HttpStatus.CREATED.value(),
                        true,
                        "Notification created successfully.",
                        savedNotification);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // Get Notification By Id
    @PreAuthorize("hasAnyRole('MANAGER','DISPATCHER')")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<NotificationDTO>> getNotificationById(
            @PathVariable Long id) {

        NotificationDTO notification =
                notificationService.getNotificationById(id);

        ApiResponse<NotificationDTO> response =
                new ApiResponse<>(
                        LocalDateTime.now(),
                        HttpStatus.OK.value(),
                        true,
                        "Notification fetched successfully.",
                        notification);

        return ResponseEntity.ok(response);
    }

    // Get All Notifications
    @PreAuthorize("hasRole('MANAGER')")
    @GetMapping
    public ResponseEntity<ApiResponse<List<NotificationDTO>>> getAllNotifications() {

        List<NotificationDTO> notifications =
                notificationService.getAllNotifications();

        ApiResponse<List<NotificationDTO>> response =
                new ApiResponse<>(
                        LocalDateTime.now(),
                        HttpStatus.OK.value(),
                        true,
                        "Notifications fetched successfully.",
                        notifications);

        return ResponseEntity.ok(response);
    }

    // Get Notifications By User
    @PreAuthorize("hasAnyRole('MANAGER','DISPATCHER')")
    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse<List<NotificationDTO>>> getNotificationsByUser(
            @PathVariable Long userId) {

        List<NotificationDTO> notifications =
                notificationService.getNotificationsByUser(userId);

        ApiResponse<List<NotificationDTO>> response =
                new ApiResponse<>(
                        LocalDateTime.now(),
                        HttpStatus.OK.value(),
                        true,
                        "User notifications fetched successfully.",
                        notifications);

        return ResponseEntity.ok(response);
    }

    // Mark Notification As Read
    @PreAuthorize("hasAnyRole('MANAGER','DISPATCHER','TECHNICIAN','CUSTOMER')")
    @PutMapping("/read/{id}")
    public ResponseEntity<ApiResponse<NotificationDTO>> markAsRead(
            @PathVariable Long id) {

        NotificationDTO notification =
                notificationService.markAsRead(id);

        ApiResponse<NotificationDTO> response =
                new ApiResponse<>(
                        LocalDateTime.now(),
                        HttpStatus.OK.value(),
                        true,
                        "Notification marked as read successfully.",
                        notification);

        return ResponseEntity.ok(response);
    }

    // Delete Notification
    @PreAuthorize("hasAnyRole('MANAGER','DISPATCHER')")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteNotification(
            @PathVariable Long id) {

        notificationService.deleteNotification(id);

        ApiResponse<Void> response =
                new ApiResponse<>(
                        LocalDateTime.now(),
                        HttpStatus.OK.value(),
                        true,
                        "Notification deleted successfully.",
                        null);

        return ResponseEntity.ok(response);
    }
    
    @PreAuthorize("hasAnyRole('MANAGER','DISPATCHER','TECHNICIAN','CUSTOMER')")
    @GetMapping("/my")
    public ResponseEntity<ApiResponse<List<NotificationDTO>>> getMyNotifications() {

        List<NotificationDTO> notifications = notificationService.getMyNotifications();

        ApiResponse<List<NotificationDTO>> response =
                new ApiResponse<>(
                        LocalDateTime.now(),
                        HttpStatus.OK.value(),
                        true,
                        "My notifications fetched successfully.",
                        notifications);

        return ResponseEntity.ok(response);
    }

 // Get Unread Notification Count
    @PreAuthorize("hasAnyRole('MANAGER','DISPATCHER','TECHNICIAN','CUSTOMER')")
    @GetMapping("/unread-count")
    public ResponseEntity<ApiResponse<Long>> getUnreadNotificationCount() {

        long count = notificationService.getUnreadNotificationCount();

        ApiResponse<Long> response =
                new ApiResponse<>(
                        LocalDateTime.now(),
                        HttpStatus.OK.value(),
                        true,
                        "Unread notification count fetched successfully.",
                        count);

        return ResponseEntity.ok(response);
    }
}