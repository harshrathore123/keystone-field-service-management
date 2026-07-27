package com.keystone.service;

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
import com.keystone.repository.StatusHistoryRepository;

@Service
public class WorkOrderServiceImpl implements WorkOrderService {

	private final WorkOrderRepository workOrderRepository;
	private final UserRepository userRepository;
	private final StatusHistoryRepository statusHistoryRepository;

	public WorkOrderServiceImpl(WorkOrderRepository workOrderRepository, UserRepository userRepository,
			StatusHistoryRepository statusHistoryRepository) {

		this.workOrderRepository = workOrderRepository;
		this.userRepository = userRepository;
		this.statusHistoryRepository = statusHistoryRepository;
	}

	@Override
	public WorkOrderDTO createWorkOrder(WorkOrderDTO workOrderDTO) {

		WorkOrder workOrder = WorkOrderMapper.toEntity(workOrderDTO);

		// Default Lifecycle Status
		workOrder.setStatus("NEW");

		WorkOrder savedWorkOrder = workOrderRepository.save(workOrder);

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

		// Update Customer Relationship
		if (workOrderDTO.getCustomerId() != null) {
			Customer customer = new Customer();
			customer.setId(workOrderDTO.getCustomerId());
			existingWorkOrder.setCustomer(customer);
		}

		// Update Site Relationship
		if (workOrderDTO.getSiteId() != null) {
			Site site = new Site();
			site.setId(workOrderDTO.getSiteId());
			existingWorkOrder.setSite(site);
		}

		// Update Assigned User Relationship
		if (workOrderDTO.getAssignedUserId() != null) {
			User user = new User();
			user.setId(workOrderDTO.getAssignedUserId());
			existingWorkOrder.setAssignedUser(user);
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
		
		System.out.println("Status History Saved");

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
}