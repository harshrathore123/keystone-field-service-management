package com.keystone.service;

import java.util.List;

import com.keystone.entity.Site;

public interface SiteService {

    // Create Site
    Site createSite(Site site);

    // Get All Sites
    List<Site> getAllSites();

    // Get Site By Id
    Site getSiteById(Long id);

    // Update Site
    Site updateSite(Long id, Site site);

    // Delete Site
    void deleteSite(Long id);

}