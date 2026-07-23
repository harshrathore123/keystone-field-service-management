package com.keystone.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.keystone.entity.Site;
import com.keystone.service.SiteService;

@RestController
@RequestMapping("/api/sites")
public class SiteController {

    private final SiteService siteService;

    public SiteController(SiteService siteService) {
        this.siteService = siteService;
    }

    // Create Site
    @PostMapping
    public Site createSite(@RequestBody Site site) {
        return siteService.createSite(site);
    }

    // Get All Sites
    @GetMapping
    public List<Site> getAllSites() {
        return siteService.getAllSites();
    }

    // Get Site By Id
    @GetMapping("/{id}")
    public Site getSiteById(@PathVariable Long id) {
        return siteService.getSiteById(id);
    }

    // Update Site
    @PutMapping("/{id}")
    public Site updateSite(@PathVariable Long id, @RequestBody Site site) {
        return siteService.updateSite(id, site);
    }

    // Delete Site
    @DeleteMapping("/{id}")
    public String deleteSite(@PathVariable Long id) {
        siteService.deleteSite(id);
        return "Site Deleted Successfully";
    }
}