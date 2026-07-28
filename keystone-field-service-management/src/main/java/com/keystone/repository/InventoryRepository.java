package com.keystone.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.keystone.entity.Inventory;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory, Long> {
	Optional<Inventory> findByPartCode(String partCode);

	List<Inventory> findByActiveTrue();

	boolean existsByPartCode(String partCode);
}
