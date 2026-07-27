package com.keystone.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.keystone.entity.Site;

public interface SiteRepository extends JpaRepository<Site, Long> {

    // Search by Site Name
    List<Site> findBySiteNameContainingIgnoreCase(String keyword);

}