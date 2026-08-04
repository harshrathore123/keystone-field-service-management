package com.keystone.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.keystone.entity.Notification;
import com.keystone.entity.WorkOrder;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    List<Notification> findByUserId(Long userId);

    boolean existsByWorkOrder(WorkOrder workOrder);
    
    long countByIsReadFalse();
    
    long countByUserEmailAndIsReadFalse(String email);
    
    List<Notification> findByUserEmailOrderByCreatedAtDesc(String email);
    
    @Query("""
    		SELECT n
    		FROM Notification n
    		WHERE n.user.email = :email
    		ORDER BY n.createdAt DESC
    		""")
    		List<Notification> getMyNotifications(@Param("email") String email);


}