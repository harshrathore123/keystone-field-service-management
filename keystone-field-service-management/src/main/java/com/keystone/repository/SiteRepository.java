package com.keystone.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.keystone.entity.Site;

public interface SiteRepository extends JpaRepository<Site, Long> {

}