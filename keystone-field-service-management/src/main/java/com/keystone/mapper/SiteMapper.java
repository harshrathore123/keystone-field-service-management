package com.keystone.mapper;

import com.keystone.dto.SiteDTO;
import com.keystone.entity.Customer;
import com.keystone.entity.Site;

public final class SiteMapper {

    private SiteMapper() {
    }

    // Convert Entity to DTO
    public static SiteDTO toDTO(Site site) {

        if (site == null) {
            return null;
        }

        SiteDTO dto = new SiteDTO();

        dto.setId(site.getId());
        dto.setSiteName(site.getSiteName());
        dto.setAddress(site.getAddress());
        dto.setCity(site.getCity());
        dto.setState(site.getState());
        dto.setPostalCode(site.getPostalCode());
        dto.setActive(site.getActive());

        if (site.getCustomer() != null) {
            dto.setCustomerId(site.getCustomer().getId());
            dto.setCustomerName(site.getCustomer().getCustomerName());
        }

        return dto;
    }

    // Convert DTO to Entity
    public static Site toEntity(SiteDTO dto) {

        if (dto == null) {
            return null;
        }

        Site site = new Site();

        site.setId(dto.getId());
        site.setSiteName(dto.getSiteName());
        site.setAddress(dto.getAddress());
        site.setCity(dto.getCity());
        site.setState(dto.getState());
        site.setPostalCode(dto.getPostalCode());
        site.setActive(dto.getActive());

        if (dto.getCustomerId() != null) {
            Customer customer = new Customer();
            customer.setId(dto.getCustomerId());
            site.setCustomer(customer);
        }

        return site;
    }
}