package com.hector.propertypro.propertypro.repository;

import com.hector.propertypro.propertypro.model.MaintenanceRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MaintenanceRequestRepository extends JpaRepository<MaintenanceRequest, Long> {
    // Custom query methods can be added here if needed
}