package com.keystone.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.keystone.dto.CustomerDashboardDTO;
import com.keystone.dto.CustomerRequestDTO;
import com.keystone.dto.WorkOrderDTO;
import com.keystone.repository.CustomerRepository;
import com.keystone.repository.NotificationRepository;
import com.keystone.repository.SiteRepository;
import com.keystone.repository.StatusHistoryRepository;
import com.keystone.repository.WorkOrderRepository;

import java.time.LocalDate;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.security.core.context.SecurityContextHolder;

import com.keystone.entity.Customer;
import com.keystone.entity.Site;
import com.keystone.entity.WorkOrder;
import com.keystone.mapper.WorkOrderMapper;
import com.keystone.repository.UserRepository;

import java.util.List;

@Service
public class CustomerPortalServiceImpl implements CustomerPortalService {

	@Autowired
	private WorkOrderRepository workOrderRepository;

	@Autowired
	private CustomerRepository customerRepository;

	@Autowired
	private SiteRepository siteRepository;

	@Autowired
	private StatusHistoryRepository statusHistoryRepository;

	@Autowired
	private NotificationRepository notificationRepository;

	@Autowired
	private UserRepository userRepository;

	@Override
	public WorkOrderDTO raiseServiceRequest(CustomerRequestDTO requestDTO) {

		// Step 1 - Get Logged-in User Email
		String email = SecurityContextHolder.getContext().getAuthentication().getName();

		// Step 2 - Fetch Customer
		Customer customer = customerRepository.findByEmail(email)
				.orElseThrow(() -> new RuntimeException("Customer not found with email : " + email));

		// Step 3 - Fetch Site
		Site site = siteRepository.findById(requestDTO.getSiteId())
				.orElseThrow(() -> new RuntimeException("Site not found with id : " + requestDTO.getSiteId()));

		// Step 4 - Create Work Order
		WorkOrder workOrder = new WorkOrder();

		workOrder.setTitle(requestDTO.getTitle());
		workOrder.setDescription(requestDTO.getDescription());
		workOrder.setPriority(requestDTO.getPriority());

		workOrder.setStatus("NEW");
		workOrder.setActive(true);

		// Customer & Site
		workOrder.setCustomer(customer);
		workOrder.setSite(site);

		// No Technician Assigned Initially
		workOrder.setAssignedUser(null);

		// Scheduled Date = Today
		workOrder.setScheduledDate(LocalDate.now().toString());

		// SLA Date
		workOrder.setSlaDate(calculateSlaDate(workOrder.getPriority(), workOrder.getScheduledDate()));
		workOrder.setWorkOrderNumber("WO-" + System.currentTimeMillis());

		// Step 5 - Save
		WorkOrder savedWorkOrder = workOrderRepository.save(workOrder);

		// Step 6 - Return DTO
		return WorkOrderMapper.toDTO(savedWorkOrder);
	}

	@Override
	public CustomerDashboardDTO getDashboard() {
		// Step 1 - Get Logged-in User Email
		String email = SecurityContextHolder
		        .getContext()
		        .getAuthentication()
		        .getName();

		// Step 2 - Fetch Customer
		Customer customer = customerRepository.findByEmail(email)
		        .orElseThrow(() ->
		                new RuntimeException("Customer not found with email : " + email));

		// Step 3 - Fetch Customer Work Orders
		List<WorkOrder> workOrders = workOrderRepository.findByCustomer(customer);
		
		CustomerDashboardDTO dashboard = new CustomerDashboardDTO();
		
		dashboard.setTotalRequests((long) workOrders.size());
		
		dashboard.setNewRequests(
		        workOrders.stream()
		                .filter(w -> "NEW".equals(w.getStatus()))
		                .count());

		dashboard.setAssignedRequests(
		        workOrders.stream()
		                .filter(w -> "ASSIGNED".equals(w.getStatus()))
		                .count());

		dashboard.setInProgressRequests(
		        workOrders.stream()
		                .filter(w -> "IN_PROGRESS".equals(w.getStatus()))
		                .count());

		dashboard.setOnHoldRequests(
		        workOrders.stream()
		                .filter(w -> "ON_HOLD".equals(w.getStatus()))
		                .count());

		dashboard.setCompletedRequests(
		        workOrders.stream()
		                .filter(w -> "COMPLETED".equals(w.getStatus()))
		                .count());

		dashboard.setClosedRequests(
		        workOrders.stream()
		                .filter(w -> "CLOSED".equals(w.getStatus()))
		                .count());

		dashboard.setCancelledRequests(
		        workOrders.stream()
		                .filter(w -> "CANCELLED".equals(w.getStatus()))
		                .count());
		
		return dashboard;
	}

	@Override
	public List<WorkOrderDTO> getMyRequests() {

		// Step 1 - Get Logged-in User Email
		String email = SecurityContextHolder.getContext().getAuthentication().getName();

		// Step 2 - Fetch Customer
		Customer customer = customerRepository.findByEmail(email)
				.orElseThrow(() -> new RuntimeException("Customer not found with email : " + email));
		// Step 3 - Fetch Customer Work Orders
		List<WorkOrder> workOrders = workOrderRepository.findByCustomer(customer);
		// Step 4 - Convert Entity to DTO
		return workOrders.stream().map(WorkOrderMapper::toDTO).collect(Collectors.toList());
	}

	@Override
	public WorkOrderDTO getRequestById(Long workOrderId) {
		// Step 1 - Get Logged-in User Email
		String email = SecurityContextHolder.getContext().getAuthentication().getName();

		// Step 2 - Fetch Customer
		Customer customer = customerRepository.findByEmail(email)
				.orElseThrow(() -> new RuntimeException("Customer not found with email : " + email));
		// Step 3 - Fetch Work Order
		WorkOrder workOrder = workOrderRepository.findById(workOrderId)
				.orElseThrow(() -> new RuntimeException("Work Order not found with id : " + workOrderId));

		// Step 4 - Validate Ownership
		if (!workOrder.getCustomer().getId().equals(customer.getId())) {
			throw new RuntimeException("Access denied. You are not authorized to view this request.");
		}

		// Step 5 - Convert Entity -> DTO
		return WorkOrderMapper.toDTO(workOrder);
	}

	private String calculateSlaDate(String priority, String scheduledDate) {

		LocalDate date = LocalDate.parse(scheduledDate);

		switch (priority.toUpperCase()) {

		case "LOW":
			return date.plusDays(3).toString();

		case "MEDIUM":
			return date.plusDays(2).toString();

		case "HIGH":
			return date.plusDays(1).toString();

		case "CRITICAL":
			return date.toString();

		default:
			return date.plusDays(2).toString();
		}
	}

}