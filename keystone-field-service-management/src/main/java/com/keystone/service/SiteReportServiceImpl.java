package com.keystone.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.keystone.dto.SiteReportDTO;
import com.keystone.entity.Site;
import com.keystone.repository.SiteRepository;
import com.keystone.repository.WorkOrderRepository;

@Service
public class SiteReportServiceImpl implements SiteReportService {

    private final SiteRepository siteRepository;
    private final WorkOrderRepository workOrderRepository;

    public SiteReportServiceImpl(SiteRepository siteRepository,
                                 WorkOrderRepository workOrderRepository) {
        this.siteRepository = siteRepository;
        this.workOrderRepository = workOrderRepository;
    }

    @Override
    public List<SiteReportDTO> getSiteReports() {

        List<Site> sites = siteRepository.findAll();
        List<SiteReportDTO> reports = new ArrayList<>();

        for (Site site : sites) {

            long total = workOrderRepository.countBySite(site);

            long completed = workOrderRepository.countBySiteAndStatus(
                    site,
                    "COMPLETED");

            long pending = total - completed;

            double completionPercentage = 0;

            if (total > 0) {
                completionPercentage = (completed * 100.0) / total;
            }

            SiteReportDTO dto = new SiteReportDTO();

            dto.setSiteId(site.getId());
            dto.setSiteName(site.getSiteName());
            dto.setTotalWorkOrders(total);
            dto.setCompletedWorkOrders(completed);
            dto.setPendingWorkOrders(pending);
            dto.setCompletionPercentage(completionPercentage);

            reports.add(dto);
        }

        return reports;
    }
}