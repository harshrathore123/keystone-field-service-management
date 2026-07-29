package com.keystone.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.keystone.dto.TechnicianPerformanceDTO;
import com.keystone.entity.User;
import com.keystone.enums.Role;
import com.keystone.repository.UserRepository;
import com.keystone.repository.WorkOrderRepository;

@Service
public class TechnicianPerformanceServiceImpl implements TechnicianPerformanceService {

    private final UserRepository userRepository;
    private final WorkOrderRepository workOrderRepository;

    public TechnicianPerformanceServiceImpl(UserRepository userRepository,
                                            WorkOrderRepository workOrderRepository) {
        this.userRepository = userRepository;
        this.workOrderRepository = workOrderRepository;
    }

    @Override
    public List<TechnicianPerformanceDTO> getTechnicianPerformance() {

        List<User> technicians = userRepository.findByRole(Role.TECHNICIAN);

        List<TechnicianPerformanceDTO> performanceList = new ArrayList<>();

        for (User technician : technicians) {

            long totalAssigned =
                    workOrderRepository.countByAssignedUser(technician);

            long completed =
                    workOrderRepository.countByAssignedUserAndStatus(
                            technician,
                            "COMPLETED");

            long pending = totalAssigned - completed;

            double completionPercentage = 0;

            if (totalAssigned > 0) {
                completionPercentage =
                        (completed * 100.0) / totalAssigned;
            }

            TechnicianPerformanceDTO dto =
                    new TechnicianPerformanceDTO();

            dto.setTechnicianId(technician.getId());
            dto.setTechnicianName(
                    technician.getFirstName() + " " + technician.getLastName());

            dto.setTotalAssignedWorkOrders(totalAssigned);
            dto.setCompletedWorkOrders(completed);
            dto.setPendingWorkOrders(pending);
            dto.setCompletionPercentage(completionPercentage);

            performanceList.add(dto);
        }

        return performanceList;
    }
}