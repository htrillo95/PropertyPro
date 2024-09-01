package com.hector.propertypro.propertypro.service;

import com.hector.propertypro.propertypro.model.Tenant;
import com.hector.propertypro.propertypro.repository.TenantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TenantService {

    private final TenantRepository tenantRepository;

    @Autowired
    public TenantService(TenantRepository tenantRepository) {
        this.tenantRepository = tenantRepository;
    }

    public List<Tenant> getAllTenants() {
        return tenantRepository.findAll();
    }

    public Optional<Tenant> getTenantById(Long id) {
        return tenantRepository.findById(id);
    }

    public List<Tenant> getTenantsByName(String name) {
        return tenantRepository.findByNameContainingIgnoreCase(name);
    }

    public List<Tenant> getTenantsByEmail(String email) {
        return tenantRepository.findByEmailContainingIgnoreCase(email);
    }

    public Tenant saveTenant(Tenant tenant) {
        return tenantRepository.save(tenant);
    }

    public Optional<Tenant> updateTenant(Long id, Tenant tenantDetails) {
        return tenantRepository.findById(id).map(tenant -> {
            tenant.setName(tenantDetails.getName());
            tenant.setEmail(tenantDetails.getEmail());
            tenant.setPhone(tenantDetails.getPhone());
            return tenantRepository.save(tenant);
        });
    }

    public void deleteTenant(Long id) {
        tenantRepository.deleteById(id);
    }

    public void deleteMultipleTenants(List<Long> ids) {
        tenantRepository.deleteAllById(ids);
    }

    public void deleteAllTenants() {
        tenantRepository.deleteAll();
    }
}