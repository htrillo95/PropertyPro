package com.hector.propertypro.propertypro.repository;

import com.hector.propertypro.propertypro.model.MaintenanceRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MaintenanceRequestRepository extends JpaRepository<MaintenanceRequest, Long> {
    List<MaintenanceRequest> findByTenant_Id(Long tenantId);
    // Custom query methods can be added here if needed
}