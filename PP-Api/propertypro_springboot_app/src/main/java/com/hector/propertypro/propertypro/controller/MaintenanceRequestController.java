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

    @PostMapping("/submit")
    public ResponseEntity<?> submitRequest(@RequestBody MaintenanceRequest request) {
        try {
            System.out.println("Received maintenance request: " + request);

            // Validate tenant and property are not null
            if (request.getTenant() == null || request.getProperty() == null) {
                System.err.println("Invalid request: Tenant or Property is null");
                return ResponseEntity.badRequest().body("Tenant and Property are required.");
            }

            MaintenanceRequest savedRequest = maintenanceRequestService.saveRequest(request);
            System.out.println("Saved maintenance request: " + savedRequest);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedRequest);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving request");
        }
    }

    @GetMapping("/tenant/{tenantId}")
    public ResponseEntity<List<MaintenanceRequest>> getRequestsByTenant(@PathVariable Long tenantId) {
        System.out.println("Fetching requests for tenant ID: " + tenantId); // Debug log
        List<MaintenanceRequest> requests = maintenanceRequestService.getRequestsByTenantId(tenantId);
        return ResponseEntity.ok(requests);
    }
}