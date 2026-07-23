package com.keystone.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "work_orders")
@Data
public class WorkOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String workOrderNumber;

    private String title;

    @Column(length = 1000)
    private String description;

    private String priority;

    private String status;

    private String scheduledDate;

    private Boolean active;

	public WorkOrder(Long id, String workOrderNumber, String title, String description, String priority, String status,
			String scheduledDate, Boolean active) {
		super();
		this.id = id;
		this.workOrderNumber = workOrderNumber;
		this.title = title;
		this.description = description;
		this.priority = priority;
		this.status = status;
		this.scheduledDate = scheduledDate;
		this.active = active;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getWorkOrderNumber() {
		return workOrderNumber;
	}

	public void setWorkOrderNumber(String workOrderNumber) {
		this.workOrderNumber = workOrderNumber;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getPriority() {
		return priority;
	}

	public void setPriority(String priority) {
		this.priority = priority;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getScheduledDate() {
		return scheduledDate;
	}

	public void setScheduledDate(String scheduledDate) {
		this.scheduledDate = scheduledDate;
	}

	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	public WorkOrder() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public String toString() {
		return "WorkOrder [id=" + id + ", workOrderNumber=" + workOrderNumber + ", title=" + title + ", description="
				+ description + ", priority=" + priority + ", status=" + status + ", scheduledDate=" + scheduledDate
				+ ", active=" + active + "]";
	}
    
    
}