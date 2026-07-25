package com.keystone.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.keystone.dto.SiteDTO;
import com.keystone.entity.Customer;
import com.keystone.entity.Site;
import com.keystone.exception.ResourceNotFoundException;
import com.keystone.mapper.SiteMapper;
import com.keystone.repository.SiteRepository;

@Service
public class SiteServiceImpl implements SiteService {

    private final SiteRepository siteRepository;

    public SiteServiceImpl(SiteRepository siteRepository) {
        this.siteRepository = siteRepository;
    }

    @Override
    public SiteDTO createSite(SiteDTO siteDTO) {

        Site site = SiteMapper.toEntity(siteDTO);

        Site savedSite = siteRepository.save(site);

        return SiteMapper.toDTO(savedSite);
    }

    @Override
    public List<SiteDTO> getAllSites() {

        return siteRepository.findAll()
                .stream()
                .map(SiteMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public SiteDTO getSiteById(Long id) {

        Site site = siteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Site not found with id : " + id));

        return SiteMapper.toDTO(site);
    }

    @Override
    public SiteDTO updateSite(Long id, SiteDTO siteDTO) {

        Site existingSite = siteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Site not found with id : " + id));

        existingSite.setSiteName(siteDTO.getSiteName());
        existingSite.setAddress(siteDTO.getAddress());
        existingSite.setCity(siteDTO.getCity());
        existingSite.setState(siteDTO.getState());
        existingSite.setPostalCode(siteDTO.getPostalCode());
        existingSite.setActive(siteDTO.getActive());

        // Update Customer Relationship
        if (siteDTO.getCustomerId() != null) {
            Customer customer = new Customer();
            customer.setId(siteDTO.getCustomerId());
            existingSite.setCustomer(customer);
        }

        Site updatedSite = siteRepository.save(existingSite);

        return SiteMapper.toDTO(updatedSite);
    }

    @Override
    public void deleteSite(Long id) {

        Site site = siteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Site not found with id : " + id));

        siteRepository.delete(site);
    }
}