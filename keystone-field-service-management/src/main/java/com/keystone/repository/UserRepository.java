package com.keystone.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.keystone.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

}