package com.keystone.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.keystone.entity.Site;
import com.keystone.repository.SiteRepository;

@Service
public class SiteServiceImpl implements SiteService {

    private final SiteRepository siteRepository;

    public SiteServiceImpl(SiteRepository siteRepository) {
        this.siteRepository = siteRepository;
    }

    @Override
    public Site createSite(Site site) {
        return siteRepository.save(site);
    }

    @Override
    public List<Site> getAllSites() {
        return siteRepository.findAll();
    }

    @Override
    public Site getSiteById(Long id) {
        return siteRepository.findById(id).orElse(null);
    }

    @Override
    public Site updateSite(Long id, Site site) {

        Site existingSite = siteRepository.findById(id).orElse(null);

        if (existingSite != null) {
            existingSite.setSiteName(site.getSiteName());
            existingSite.setAddress(site.getAddress());
            existingSite.setCity(site.getCity());
            existingSite.setState(site.getState());
            existingSite.setPostalCode(site.getPostalCode());
            existingSite.setActive(site.getActive());

            return siteRepository.save(existingSite);
        }

        return null;
    }

    @Override
    public void deleteSite(Long id) {
        siteRepository.deleteById(id);
    }
}