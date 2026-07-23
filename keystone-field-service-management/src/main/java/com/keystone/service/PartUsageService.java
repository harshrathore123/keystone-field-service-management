package com.keystone.service;

import java.util.List;

import com.keystone.entity.PartUsage;

public interface PartUsageService {

    PartUsage createPartUsage(PartUsage partUsage);

    List<PartUsage> getAllPartUsages();

    PartUsage getPartUsageById(Long id);

    PartUsage updatePartUsage(Long id, PartUsage partUsage);

    void deletePartUsage(Long id);
}