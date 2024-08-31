package com.hector.propertypro.propertypro.controller;

import com.hector.propertypro.propertypro.model.Tenant;
import com.hector.propertypro.propertypro.service.TenantService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/tenants")
public class TenantController {

    private final TenantService tenantService;

    public TenantController(TenantService tenantService) {
        this.tenantService = tenantService;
    }

    @GetMapping
    public List<Tenant> getAllTenants() {
        return tenantService.getAllTenants();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tenant> getTenantById(@PathVariable Long id) {
        return tenantService.getTenantById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Tenant createTenant(@RequestBody Tenant tenant) {
        return tenantService.saveTenant(tenant);
    }

    @PostMapping("/batch")
    public ResponseEntity<List<Tenant>> createMultipleTenants(@RequestBody List<Tenant> tenants) {
        List<Tenant> savedTenants = tenants.stream()
                .map(tenantService::saveTenant)
                .collect(Collectors.toList());
        return ResponseEntity.ok(savedTenants);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Tenant> updateTenant(@PathVariable Long id, @RequestBody Tenant tenant) {
        return tenantService.getTenantById(id)
                .map(existingTenant -> {
                    tenant.setId(id);
                    return ResponseEntity.ok(tenantService.saveTenant(tenant));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTenant(@PathVariable Long id) {
        tenantService.deleteTenant(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteMultipleTenants(@RequestBody List<Long> ids) {
        tenantService.deleteMultipleTenants(ids);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/deleteAll")
    public ResponseEntity<Void> deleteAllTenants() {
        tenantService.deleteAllTenants();
        return ResponseEntity.noContent().build();
    }

}
