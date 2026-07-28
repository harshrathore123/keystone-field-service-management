package com.keystone.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.keystone.entity.User;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    @Query("SELECT u.id FROM User u WHERE u.email = :email")
	boolean existsByEmail(String email);

    boolean existsByPhoneNumber(String phoneNumber);

}