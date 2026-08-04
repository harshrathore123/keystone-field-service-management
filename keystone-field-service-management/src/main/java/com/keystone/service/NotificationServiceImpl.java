package com.keystone.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.keystone.dto.NotificationDTO;
import com.keystone.entity.Notification;
import com.keystone.entity.User;
import com.keystone.entity.WorkOrder;
import com.keystone.exception.ResourceNotFoundException;
import com.keystone.mapper.NotificationMapper;
import com.keystone.repository.NotificationRepository;
import com.keystone.repository.UserRepository;
import com.keystone.repository.WorkOrderRepository;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

@Service
public class NotificationServiceImpl implements NotificationService {

	private final NotificationRepository notificationRepository;
	private final UserRepository userRepository;
	private final WorkOrderRepository workOrderRepository;

	public NotificationServiceImpl(NotificationRepository notificationRepository, UserRepository userRepository,
			WorkOrderRepository workOrderRepository) {

		this.notificationRepository = notificationRepository;
		this.userRepository = userRepository;
		this.workOrderRepository = workOrderRepository;
	}

	@Override
	public NotificationDTO createNotification(NotificationDTO notificationDTO) {

		User user = userRepository.findById(notificationDTO.getUserId()).orElseThrow(
				() -> new ResourceNotFoundException("User not found with id : " + notificationDTO.getUserId()));

		WorkOrder workOrder = null;

		if (notificationDTO.getWorkOrderId() != null) {

			workOrder = workOrderRepository.findById(notificationDTO.getWorkOrderId())
					.orElseThrow(() -> new ResourceNotFoundException(
							"WorkOrder not found with id : " + notificationDTO.getWorkOrderId()));
		}

		Notification notification = NotificationMapper.toEntity(notificationDTO);

		notification.setUser(user);
		notification.setWorkOrder(workOrder);
		notification.setCreatedAt(LocalDateTime.now());
		notification.setIsRead(false);

		Notification savedNotification = notificationRepository.save(notification);

		return NotificationMapper.toDTO(savedNotification);
	}

	@Override
	public NotificationDTO getNotificationById(Long id) {

		Notification notification = notificationRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Notification not found with id : " + id));

		return NotificationMapper.toDTO(notification);
	}

	@Override
	public List<NotificationDTO> getAllNotifications() {

		return notificationRepository.findAll().stream().map(NotificationMapper::toDTO).toList();
	}

	@Override
	public List<NotificationDTO> getNotificationsByUser(Long userId) {

		return notificationRepository.findByUserId(userId).stream().map(NotificationMapper::toDTO).toList();
	}

	@Override
	public NotificationDTO markAsRead(Long id) {

		Notification notification = notificationRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Notification not found with id : " + id));

		notification.setIsRead(true);

		Notification updatedNotification = notificationRepository.save(notification);

		return NotificationMapper.toDTO(updatedNotification);
	}

	@Override
	public void deleteNotification(Long id) {

		Optional<Notification> notification = notificationRepository.findById(id);

		if (notification.isEmpty()) {
			throw new ResourceNotFoundException("Notification not found with id : " + id);
		}

		notificationRepository.delete(notification.get());
	}

	@Override
	public long getUnreadNotificationCount() {

	    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

	    String email = authentication.getName();

	    return notificationRepository.countByUserEmailAndIsReadFalse(email);
	}
	
	@Override
	public List<NotificationDTO> getMyNotifications() {

	    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

	    System.out.println("==============================");
	    System.out.println("Principal : " + authentication.getPrincipal());
	    System.out.println("Name      : " + authentication.getName());
	    System.out.println("Authorities : " + authentication.getAuthorities());
	    System.out.println("==============================");

	    String email = authentication.getName();

	    List<Notification> list = notificationRepository.getMyNotifications(email);

	    System.out.println("Notification Count : " + list.size());

	    return list.stream()
	            .map(NotificationMapper::toDTO)
	            .toList();
	}

}