package com.keystone.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChartDataDTO {
	private long totalJobs;

	private long newJobs;

	private long assignedJobs;

	private long inProgressJobs;

	private long onHoldJobs;

	private long completedJobs;

	private long closedJobs;

	private long cancelledJobs;

}