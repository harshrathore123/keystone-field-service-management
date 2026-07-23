package com.keystone.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "time_logs")
@Data
public class TimeLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String startTime;

    private String endTime;

    private Double hoursWorked;

    private String workDescription;

	public TimeLog(Long id, String startTime, String endTime, Double hoursWorked, String workDescription) {
		super();
		this.id = id;
		this.startTime = startTime;
		this.endTime = endTime;
		this.hoursWorked = hoursWorked;
		this.workDescription = workDescription;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getStartTime() {
		return startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	public Double getHoursWorked() {
		return hoursWorked;
	}

	public void setHoursWorked(Double hoursWorked) {
		this.hoursWorked = hoursWorked;
	}

	public String getWorkDescription() {
		return workDescription;
	}

	public void setWorkDescription(String workDescription) {
		this.workDescription = workDescription;
	}

	public TimeLog() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public String toString() {
		return "TimeLog [id=" + id + ", startTime=" + startTime + ", endTime=" + endTime + ", hoursWorked="
				+ hoursWorked + ", workDescription=" + workDescription + "]";
	}
    
    
}