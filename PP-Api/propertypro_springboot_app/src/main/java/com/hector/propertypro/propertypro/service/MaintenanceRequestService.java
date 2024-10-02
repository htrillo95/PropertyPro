package com.hector.propertypro.propertypro.service;

import com.hector.propertypro.propertypro.model.MaintenanceRequest;
import com.hector.propertypro.propertypro.repository.MaintenanceRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MaintenanceRequestService {

    @Autowired
    private MaintenanceRequestRepository maintenanceRequestRepository;

    // Save a new maintenance request
    public MaintenanceRequest saveRequest(MaintenanceRequest request) {
        request.setRequestDate(java.time.LocalDate.now());
        return maintenanceRequestRepository.save(request);
    }

    // Fetch all maintenance requests (admin view)
    public List<MaintenanceRequest> getAllRequests() {
        return maintenanceRequestRepository.findAll();
    }

    // Fetch maintenance requests for a specific tenant
    public List<MaintenanceRequest> getRequestsByTenantId(Long tenantId) {
        return maintenanceRequestRepository.findByTenant_Id(tenantId);
    }

    // Update the status of a maintenance request
    public MaintenanceRequest updateRequestStatus(Long requestId, boolean isResolved) {
        MaintenanceRequest request = maintenanceRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Maintenance Request not found"));
        request.setResolved(isResolved);
        return maintenanceRequestRepository.save(request);
    }
}