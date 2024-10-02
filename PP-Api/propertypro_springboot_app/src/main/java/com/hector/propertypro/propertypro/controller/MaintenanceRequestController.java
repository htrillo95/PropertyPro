package com.hector.propertypro.propertypro.controller;

import com.hector.propertypro.propertypro.model.MaintenanceRequest;
import com.hector.propertypro.propertypro.service.MaintenanceRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/maintenance")
public class MaintenanceRequestController {

    @Autowired
    private MaintenanceRequestService maintenanceRequestService;

    // Endpoint for submitting a maintenance request
    @PostMapping("/submit")
    public ResponseEntity<MaintenanceRequest> submitRequest(@RequestBody MaintenanceRequest request) {
        MaintenanceRequest savedRequest = maintenanceRequestService.saveRequest(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedRequest);
    }

    // Endpoint for fetching all maintenance requests (admin view)
    @GetMapping("/all")
    public ResponseEntity<List<MaintenanceRequest>> getAllRequests() {
        List<MaintenanceRequest> requests = maintenanceRequestService.getAllRequests();
        return ResponseEntity.ok(requests);
    }

    // Endpoint for fetching maintenance requests by tenant ID
    @GetMapping("/tenant/{tenantId}")
    public ResponseEntity<List<MaintenanceRequest>> getRequestsByTenant(@PathVariable Long tenantId) {
        List<MaintenanceRequest> requests = maintenanceRequestService.getRequestsByTenantId(tenantId);
        return ResponseEntity.ok(requests);
    }

    // Endpoint for updating the status of a maintenance request
    @PutMapping("/update-status/{requestId}")
    public ResponseEntity<MaintenanceRequest> updateRequestStatus(@PathVariable Long requestId, @RequestParam boolean isResolved) {
        MaintenanceRequest updatedRequest = maintenanceRequestService.updateRequestStatus(requestId, isResolved);
        return ResponseEntity.ok(updatedRequest);
    }
}