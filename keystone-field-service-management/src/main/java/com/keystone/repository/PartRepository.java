package com.keystone.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.keystone.entity.Part;

public interface PartRepository extends JpaRepository<Part, Long> {

}