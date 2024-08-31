package com.hector.propertypro.propertypro.service;

import com.hector.propertypro.propertypro.model.MaintenanceRequest;
import com.hector.propertypro.propertypro.repository.MaintenanceRequestRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MaintenanceRequestService {
    private final MaintenanceRequestRepository maintenanceRequestRepository;

    public MaintenanceRequestService(MaintenanceRequestRepository maintenanceRequestRepository) {
        this.maintenanceRequestRepository = maintenanceRequestRepository;
    }

    public List<MaintenanceRequest> getAllMaintenanceRequests() {
        return maintenanceRequestRepository.findAll();
    }

    public Optional<MaintenanceRequest> getMaintenanceRequestById(Long id) {
        return maintenanceRequestRepository.findById(id);
    }

    public MaintenanceRequest saveMaintenanceRequest(MaintenanceRequest maintenanceRequest) {
        return maintenanceRequestRepository.save(maintenanceRequest);
    }

    public void deleteMaintenanceRequest(Long id) {
        maintenanceRequestRepository.deleteById(id);
    }

    public void deleteMultipleMaintenanceRequests(List<Long> ids) {
        maintenanceRequestRepository.deleteAllById(ids);
    }
}