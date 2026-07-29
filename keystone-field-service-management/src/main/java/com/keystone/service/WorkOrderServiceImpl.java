package com.keystone.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.keystone.dto.WorkOrderDTO;
import com.keystone.entity.Customer;
import com.keystone.entity.Site;
import com.keystone.entity.User;
import com.keystone.entity.WorkOrder;
import com.keystone.exception.ResourceNotFoundException;
import com.keystone.mapper.WorkOrderMapper;
import com.keystone.repository.WorkOrderRepository;
import com.keystone.repository.UserRepository;

import com.keystone.entity.StatusHistory;
import com.keystone.repository.CustomerRepository;
import com.keystone.repository.NotificationRepository;
import com.keystone.repository.SiteRepository;
import com.keystone.repository.StatusHistoryRepository;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import com.keystone.entity.Notification;

@Service
public class WorkOrderServiceImpl implements WorkOrderService {

	private final WorkOrderRepository workOrderRepository;
	private final UserRepository userRepository;
	private final StatusHistoryRepository statusHistoryRepository;
	private final NotificationRepository notificationRepository;
	private final CustomerRepository customerRepository;
	private final SiteRepository siteRepository;

	public WorkOrderServiceImpl(WorkOrderRepository workOrderRepository, CustomerRepository customerRepository,
			SiteRepository siteRepository, UserRepository userRepository,
			StatusHistoryRepository statusHistoryRepository, NotificationRepository notificationRepository) {

		this.workOrderRepository = workOrderRepository;
		this.customerRepository = customerRepository;
		this.siteRepository = siteRepository;
		this.userRepository = userRepository;
		this.statusHistoryRepository = statusHistoryRepository;
		this.notificationRepository = notificationRepository;
	}

	@Override
	public WorkOrderDTO createWorkOrder(WorkOrderDTO workOrderDTO) {

		WorkOrder workOrder = WorkOrderMapper.toEntity(workOrderDTO);

		Customer customer = customerRepository.findById(workOrderDTO.getCustomerId()).orElseThrow(
				() -> new ResourceNotFoundException("Customer not found with id : " + workOrderDTO.getCustomerId()));

		Site site = siteRepository.findById(workOrderDTO.getSiteId()).orElseThrow(
				() -> new ResourceNotFoundException("Site not found with id : " + workOrderDTO.getSiteId()));

		workOrder.setCustomer(customer);
		workOrder.setSite(site);

		if (workOrderDTO.getAssignedUserId() != null) {

			User user = userRepository.findById(workOrderDTO.getAssignedUserId())
					.orElseThrow(() -> new ResourceNotFoundException(
							"User not found with id : " + workOrderDTO.getAssignedUserId()));

			workOrder.setAssignedUser(user);
		}

		workOrder.setStatus("NEW");

		workOrder.setSlaDate(calculateSlaDate(workOrder.getPriority(), workOrder.getScheduledDate()));

		WorkOrder savedWorkOrder = workOrderRepository.save(workOrder);

		if (savedWorkOrder.getAssignedUser() != null) {

			Notification notification = new Notification();

			notification.setTitle("New Work Order Assigned");
			notification.setMessage("Work Order " + savedWorkOrder.getWorkOrderNumber() + " has been assigned to you.");

			notification.setCreatedAt(LocalDateTime.now());
			notification.setIsRead(false);
			notification.setUser(savedWorkOrder.getAssignedUser());
			notification.setWorkOrder(savedWorkOrder);

			notificationRepository.save(notification);
		}

		return WorkOrderMapper.toDTO(savedWorkOrder);
	}

	@Override
	public List<WorkOrderDTO> getAllWorkOrders() {

		return workOrderRepository.findAll().stream().map(WorkOrderMapper::toDTO).collect(Collectors.toList());
	}

	@Override
	public WorkOrderDTO getWorkOrderById(Long id) {

		WorkOrder workOrder = workOrderRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Work Order not found with id : " + id));

		return WorkOrderMapper.toDTO(workOrder);
	}

	@Override
	public WorkOrderDTO updateWorkOrder(Long id, WorkOrderDTO workOrderDTO) {

		WorkOrder existingWorkOrder = workOrderRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Work Order not found with id : " + id));

		existingWorkOrder.setWorkOrderNumber(workOrderDTO.getWorkOrderNumber());
		existingWorkOrder.setTitle(workOrderDTO.getTitle());
		existingWorkOrder.setDescription(workOrderDTO.getDescription());
		existingWorkOrder.setPriority(workOrderDTO.getPriority());
		existingWorkOrder.setStatus(workOrderDTO.getStatus());
		existingWorkOrder.setScheduledDate(workOrderDTO.getScheduledDate());
		existingWorkOrder.setActive(workOrderDTO.getActive());

		Customer customer = customerRepository.findById(workOrderDTO.getCustomerId()).orElseThrow(
				() -> new ResourceNotFoundException("Customer not found with id : " + workOrderDTO.getCustomerId()));

		Site site = siteRepository.findById(workOrderDTO.getSiteId()).orElseThrow(
				() -> new ResourceNotFoundException("Site not found with id : " + workOrderDTO.getSiteId()));

		existingWorkOrder.setCustomer(customer);
		existingWorkOrder.setSite(site);

		if (workOrderDTO.getAssignedUserId() != null) {

			User user = userRepository.findById(workOrderDTO.getAssignedUserId())
					.orElseThrow(() -> new ResourceNotFoundException(
							"User not found with id : " + workOrderDTO.getAssignedUserId()));

			existingWorkOrder.setAssignedUser(user);
		} else {
			existingWorkOrder.setAssignedUser(null);
		}

		WorkOrder updatedWorkOrder = workOrderRepository.save(existingWorkOrder);

		return WorkOrderMapper.toDTO(updatedWorkOrder);
	}

	@Override
	public void deleteWorkOrder(Long id) {

		WorkOrder workOrder = workOrderRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Work Order not found with id : " + id));

		workOrderRepository.delete(workOrder);
	}

	@Override
	public List<WorkOrderDTO> searchWorkOrders(String keyword) {

		return workOrderRepository.findByTitleContainingIgnoreCase(keyword).stream().map(WorkOrderMapper::toDTO)
				.collect(Collectors.toList());
	}

	@Override
	public Page<WorkOrderDTO> getWorkOrdersWithPagination(Pageable pageable) {

		return workOrderRepository.findAll(pageable).map(WorkOrderMapper::toDTO);
	}

	@Override
	public WorkOrderDTO assignTechnician(Long workOrderId, Long userId) {

		// Step 1: Find Work Order
		WorkOrder workOrder = workOrderRepository.findById(workOrderId)
				.orElseThrow(() -> new ResourceNotFoundException("Work Order not found with id : " + workOrderId));

		// Step 2: Find User
		User user = userRepository.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User not found with id : " + userId));

		// Step 3: Assign Technician
		workOrder.setAssignedUser(user);

		// Step 4: Save
		WorkOrder updatedWorkOrder = workOrderRepository.save(workOrder);

		// Step 5: Return DTO
		return WorkOrderMapper.toDTO(updatedWorkOrder);
	}

	@Override
	public WorkOrderDTO updatePriority(Long workOrderId, String priority) {

		// Step 1: Find Work Order
		WorkOrder workOrder = workOrderRepository.findById(workOrderId)
				.orElseThrow(() -> new ResourceNotFoundException("Work Order not found with id : " + workOrderId));

		// Step 2: Update Priority
		workOrder.setPriority(priority);

		// Step 3: Save Updated Work Order
		WorkOrder updatedWorkOrder = workOrderRepository.save(workOrder);

		// Step 4: Return DTO
		return WorkOrderMapper.toDTO(updatedWorkOrder);
	}

	@Override
	public WorkOrderDTO updateStatus(Long workOrderId, String status) {

		WorkOrder workOrder = workOrderRepository.findById(workOrderId)
				.orElseThrow(() -> new ResourceNotFoundException("Work Order not found with id : " + workOrderId));

		if (!isValidTransition(workOrder.getStatus(), status)) {
			throw new IllegalArgumentException(
					"Invalid status transition from " + workOrder.getStatus() + " to " + status);
		}

		// Save Status History
		StatusHistory history = new StatusHistory();

		history.setOldStatus(workOrder.getStatus());
		history.setNewStatus(status);
		history.setChangedBy("Manager");
		history.setChangedDate(java.time.LocalDateTime.now().toString());
		history.setRemarks("Status updated via API");
		history.setWorkOrder(workOrder);

		statusHistoryRepository.save(history);

		workOrder.setStatus(status);

		WorkOrder updatedWorkOrder = workOrderRepository.save(workOrder);

		return WorkOrderMapper.toDTO(updatedWorkOrder);
	}

	@Override
	public WorkOrderDTO updateSlaDate(Long workOrderId, String slaDate) {

		// Find Work Order
		WorkOrder workOrder = workOrderRepository.findById(workOrderId)
				.orElseThrow(() -> new ResourceNotFoundException("Work Order not found with id : " + workOrderId));

		// Update SLA Date
		workOrder.setSlaDate(slaDate);

		// Save
		WorkOrder updatedWorkOrder = workOrderRepository.save(workOrder);

		return WorkOrderMapper.toDTO(updatedWorkOrder);
	}

	private boolean isValidTransition(String currentStatus, String newStatus) {

		switch (currentStatus) {

		case "NEW":
			return newStatus.equals("ASSIGNED") || newStatus.equals("CANCELLED");

		case "ASSIGNED":
			return newStatus.equals("IN_PROGRESS") || newStatus.equals("CANCELLED");

		case "IN_PROGRESS":
			return newStatus.equals("ON_HOLD") || newStatus.equals("COMPLETED");

		case "ON_HOLD":
			return newStatus.equals("IN_PROGRESS") || newStatus.equals("CANCELLED");

		case "COMPLETED":
			return newStatus.equals("CLOSED");

		case "CLOSED":
		case "CANCELLED":
			return false;

		default:
			return false;
		}
	}

	@Override
	public List<WorkOrderDTO> getMyAssignedJobs() {

		// Get logged-in user's email from JWT
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

		String email = authentication.getName();

		// Fetch logged-in technician
		User technician = userRepository.findByEmail(email)
				.orElseThrow(() -> new ResourceNotFoundException("User not found with email : " + email));

		// Fetch assigned work orders
		List<WorkOrder> workOrders = workOrderRepository.findByAssignedUser(technician);

		// Convert Entity -> DTO
		return workOrders.stream().map(WorkOrderMapper::toDTO).collect(Collectors.toList());
	}

	@Override
	public WorkOrderDTO startJob(Long workOrderId) {

		// Step 1: Find Work Order
		WorkOrder workOrder = workOrderRepository.findById(workOrderId)
				.orElseThrow(() -> new ResourceNotFoundException("Work Order not found with id : " + workOrderId));

		// Step 2: Get Logged-in Technician
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

		String email = authentication.getName();

		User technician = userRepository.findByEmail(email)
				.orElseThrow(() -> new ResourceNotFoundException("User not found with email : " + email));

		// Step 3: Verify Assigned Technician
		if (!workOrder.getAssignedUser().getId().equals(technician.getId())) {
			throw new IllegalArgumentException("You are not assigned to this work order.");
		}

		// Step 4: Verify Current Status
		if (!workOrder.getStatus().equals("ASSIGNED")) {
			throw new IllegalArgumentException("Only ASSIGNED work orders can be started.");
		}

		// Step 5: Save Status History
		StatusHistory history = new StatusHistory();

		history.setOldStatus("ASSIGNED");
		history.setNewStatus("IN_PROGRESS");
		history.setChangedBy(email);
		history.setChangedDate(java.time.LocalDateTime.now().toString());
		history.setRemarks("Job Started");
		history.setWorkOrder(workOrder);

		statusHistoryRepository.save(history);

		// Step 6: Update Status
		workOrder.setStatus("IN_PROGRESS");

		// Step 7: Save Work Order
		WorkOrder updatedWorkOrder = workOrderRepository.save(workOrder);

		// Step 8: Return DTO
		return WorkOrderMapper.toDTO(updatedWorkOrder);
	}

	@Override
	public WorkOrderDTO pauseJob(Long workOrderId) {
		// Step 1: Find Work Order
		WorkOrder workOrder = workOrderRepository.findById(workOrderId)
				.orElseThrow(() -> new ResourceNotFoundException("Work Order not found with id : " + workOrderId));

		// Step 2: Get Logged-in Technician
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

		String email = authentication.getName();

		User technician = userRepository.findByEmail(email)
				.orElseThrow(() -> new ResourceNotFoundException("User not found with email : " + email));

		// Step 3: Verify Assigned Technician
		if (!workOrder.getAssignedUser().getId().equals(technician.getId())) {
			throw new IllegalArgumentException("You are not assigned to this work order.");
		}

		// Step 4: Verify Current Status
		if (!workOrder.getStatus().equals("IN_PROGRESS")) {
			throw new IllegalArgumentException("Only IN_PROGRESS work orders can be paused.");
		}

		// Step 5: Save Status History
		StatusHistory history = new StatusHistory();

		history.setOldStatus("IN_PROGRESS");
		history.setNewStatus("ON_HOLD");
		history.setChangedBy(email);
		history.setChangedDate(LocalDateTime.now().toString());
		history.setRemarks("Job Paused");
		history.setWorkOrder(workOrder);

		statusHistoryRepository.save(history);

		// Step 6: Update Status
		workOrder.setStatus("ON_HOLD");

		// Step 7: Save Work Order
		WorkOrder updatedWorkOrder = workOrderRepository.save(workOrder);

		// Step 8: Return DTO
		return WorkOrderMapper.toDTO(updatedWorkOrder);
	}

	@Override
	public WorkOrderDTO resumeJob(Long workOrderId) {
		// Step 1: Find Work Order
		WorkOrder workOrder = workOrderRepository.findById(workOrderId)
				.orElseThrow(() -> new ResourceNotFoundException("Work Order not found with id : " + workOrderId));

		// Step 2: Get Logged-in Technician
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

		String email = authentication.getName();

		User technician = userRepository.findByEmail(email)
				.orElseThrow(() -> new ResourceNotFoundException("User not found with email : " + email));

		// Step 3: Verify Assigned Technician
		if (!workOrder.getAssignedUser().getId().equals(technician.getId())) {
			throw new IllegalArgumentException("You are not assigned to this work order.");
		}

		// Step 4: Verify Current Status
		if (!workOrder.getStatus().equals("ON_HOLD")) {
			throw new IllegalArgumentException("Only ON_HOLD work orders can be resumed.");
		}

		// Step 5: Save Status History
		StatusHistory history = new StatusHistory();

		history.setOldStatus("ON_HOLD");
		history.setNewStatus("IN_PROGRESS");
		history.setRemarks("Job Resumed");
		history.setChangedBy(email);
		history.setChangedDate(LocalDateTime.now().toString());
		history.setWorkOrder(workOrder);

		statusHistoryRepository.save(history);

		// Step 6: Update Status
		workOrder.setStatus("IN_PROGRESS");

		// Step 7: Save Work Order
		WorkOrder updatedWorkOrder = workOrderRepository.save(workOrder);

		// Step 8: Return DTO
		return WorkOrderMapper.toDTO(updatedWorkOrder);
	}

	@Override
	public WorkOrderDTO completeJob(Long workOrderId) {

		// Step 1: Find Work Order
		WorkOrder workOrder = workOrderRepository.findById(workOrderId)
				.orElseThrow(() -> new ResourceNotFoundException("Work Order not found with id : " + workOrderId));

		// Step 2: Get Logged-in Technician
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

		String email = authentication.getName();

		User technician = userRepository.findByEmail(email)
				.orElseThrow(() -> new ResourceNotFoundException("User not found with email : " + email));

		// Step 3: Verify Assigned Technician
		if (!workOrder.getAssignedUser().getId().equals(technician.getId())) {
			throw new IllegalArgumentException("You are not assigned to this work order.");
		}

		// Step 4: Verify Current Status
		if (!workOrder.getStatus().equals("IN_PROGRESS")) {
			throw new IllegalArgumentException("Only IN_PROGRESS work orders can be completed.");
		}

		// Step 5: Save Status History
		StatusHistory history = new StatusHistory();

		history.setOldStatus("IN_PROGRESS");
		history.setNewStatus("COMPLETED");
		history.setChangedBy(email);
		history.setChangedDate(LocalDateTime.now().toString());
		history.setRemarks("Job Completed");
		history.setWorkOrder(workOrder);

		statusHistoryRepository.save(history);

		// Step 6: Update Status
		workOrder.setStatus("COMPLETED");

		// Step 7: Save Work Order
		WorkOrder updatedWorkOrder = workOrderRepository.save(workOrder);

		// Step 8: Return DTO
		return WorkOrderMapper.toDTO(updatedWorkOrder);
	}

	private String calculateSlaDate(String priority, String scheduledDate) {

	    LocalDateTime dateTime = LocalDateTime.parse(scheduledDate);

	    switch (priority.toUpperCase()) {

	        case "LOW":
	            return dateTime.plusDays(3).toString();

	        case "MEDIUM":
	            return dateTime.plusDays(2).toString();

	        case "HIGH":
	            return dateTime.plusDays(1).toString();

	        case "CRITICAL":
	            return dateTime.toString();

	        default:
	            return dateTime.plusDays(2).toString();
	    }
	}
}