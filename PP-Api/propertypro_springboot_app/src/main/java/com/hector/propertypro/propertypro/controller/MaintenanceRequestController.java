package com.hector.propertypro.propertypro.controller;

import com.hector.propertypro.propertypro.model.MaintenanceRequest;
import com.hector.propertypro.propertypro.service.MaintenanceRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/maintenance-requests")
public class MaintenanceRequestController {

    private final MaintenanceRequestService maintenanceRequestService;

    @Autowired
    public MaintenanceRequestController(MaintenanceRequestService maintenanceRequestService) {
        this.maintenanceRequestService = maintenanceRequestService;
    }

    @GetMapping
    public List<MaintenanceRequest> getAllMaintenanceRequests() {
        return maintenanceRequestService.getAllMaintenanceRequests();
    }

    @GetMapping("/{id}")
    public ResponseEntity<MaintenanceRequest> getMaintenanceRequestById(@PathVariable Long id) {
        return maintenanceRequestService.getMaintenanceRequestById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public MaintenanceRequest createMaintenanceRequest(@RequestBody MaintenanceRequest maintenanceRequest) {
        return maintenanceRequestService.saveMaintenanceRequest(maintenanceRequest);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MaintenanceRequest> updateMaintenanceRequest(@PathVariable Long id, @RequestBody MaintenanceRequest maintenanceRequest) {
        return maintenanceRequestService.getMaintenanceRequestById(id)
                .map(existingRequest -> {
                    maintenanceRequest.setId(id);
                    return ResponseEntity.ok(maintenanceRequestService.saveMaintenanceRequest(maintenanceRequest));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMaintenanceRequest(@PathVariable Long id) {
        maintenanceRequestService.deleteMaintenanceRequest(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteMultipleMaintenanceRequests(@RequestBody List<Long> ids) {
        maintenanceRequestService.deleteMultipleMaintenanceRequests(ids);
        return ResponseEntity.noContent().build();
    }
}