package com.keystone.service;

import java.util.List;

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

}