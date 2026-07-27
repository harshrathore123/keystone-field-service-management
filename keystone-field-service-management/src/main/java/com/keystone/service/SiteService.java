package com.keystone.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.keystone.dto.SiteDTO;

public interface SiteService {

    // Create Site
    SiteDTO createSite(SiteDTO siteDTO);

    // Get All Sites
    List<SiteDTO> getAllSites();

    // Get Site By Id
    SiteDTO getSiteById(Long id);

    // Update Site
    SiteDTO updateSite(Long id, SiteDTO siteDTO);

    // Delete Site
    void deleteSite(Long id);
    
 // Search Sites
    List<SiteDTO> searchSites(String keyword);

    // Pagination
    Page<SiteDTO> getSitesWithPagination(Pageable pageable);

}