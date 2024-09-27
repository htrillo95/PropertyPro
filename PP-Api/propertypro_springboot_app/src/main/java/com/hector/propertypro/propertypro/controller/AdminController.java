package com.hector.propertypro.propertypro.controller;

import com.hector.propertypro.propertypro.model.User;
import com.hector.propertypro.propertypro.model.Property;
import com.hector.propertypro.propertypro.model.Tenant;
import com.hector.propertypro.propertypro.model.Lease;
import com.hector.propertypro.propertypro.model.Role;
import com.hector.propertypro.propertypro.repository.UserRepository;
import com.hector.propertypro.propertypro.repository.PropertyRepository;
import com.hector.propertypro.propertypro.repository.TenantRepository;
import com.hector.propertypro.propertypro.repository.LeaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PropertyRepository propertyRepository;

    @Autowired
    private TenantRepository tenantRepository;

    @Autowired
    private LeaseRepository leaseRepository;

    // --- User Management ---

    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setUsername(updatedUser.getUsername());
                    user.setEmail(updatedUser.getEmail());
                    user.setRoles(updatedUser.getRoles());
                    return ResponseEntity.ok(userRepository.save(user));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return userRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/users/{id}/roles")
    public ResponseEntity<User> assignRoleToUser(@PathVariable Long id, @RequestBody Role role) {
        return userRepository.findById(id)
                .map(user -> {
                    user.getRoles().add(role);
                    return ResponseEntity.ok(userRepository.save(user));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/users/search")
    public ResponseEntity<User> searchUserByEmail(@RequestParam String email) {
        return userRepository.findByEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // --- Property Management ---

    @PostMapping("/properties")
    public ResponseEntity<Property> addProperty(@RequestBody Property property) {
        Property savedProperty = propertyRepository.save(property);
        return ResponseEntity.ok(savedProperty);
    }

    @PutMapping("/properties/{id}")
    public ResponseEntity<Property> updateProperty(@PathVariable Long id, @RequestBody Property updatedProperty) {
        return propertyRepository.findById(id)
                .map(property -> {
                    property.setAddress(updatedProperty.getAddress());
                    property.setType(updatedProperty.getType());
                    property.setRentAmount(updatedProperty.getRentAmount());
                    property.setBedrooms(updatedProperty.getBedrooms());
                    property.setBathrooms(updatedProperty.getBathrooms());
                    return ResponseEntity.ok(propertyRepository.save(property));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/properties/{id}")
    public ResponseEntity<Void> deleteProperty(@PathVariable Long id) {
        propertyRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/properties/search")
    public ResponseEntity<List<Property>> searchPropertyByAddress(@RequestParam String address) {
        List<Property> properties = propertyRepository.findByAddressContainingIgnoreCase(address);
        if (properties.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(properties);
    }

    // --- Tenant Management ---

    @PostMapping("/tenants")
    public ResponseEntity<Tenant> addTenant(@RequestBody Tenant tenant) {
        Tenant savedTenant = tenantRepository.save(tenant);
        return ResponseEntity.ok(savedTenant);
    }

    @PutMapping("/tenants/{id}")
    public ResponseEntity<Tenant> updateTenant(@PathVariable Long id, @RequestBody Tenant updatedTenant) {
        return tenantRepository.findById(id)
                .map(tenant -> {
                    tenant.setName(updatedTenant.getName());
                    tenant.setEmail(updatedTenant.getEmail());
                    tenant.setPhone(updatedTenant.getPhone());
                    return ResponseEntity.ok(tenantRepository.save(tenant));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/tenants/{id}")
    public ResponseEntity<Void> deleteTenant(@PathVariable Long id) {
        tenantRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // --- Lease Management ---

    @PostMapping("/leases")
    public ResponseEntity<Lease> addLease(@RequestBody Lease lease) {
        Lease savedLease = leaseRepository.save(lease);
        return ResponseEntity.ok(savedLease);
    }

    @PutMapping("/leases/{id}")
    public ResponseEntity<Lease> updateLease(@PathVariable Long id, @RequestBody Lease updatedLease) {
        return leaseRepository.findById(id)
                .map(lease -> {
                    lease.setStartDate(updatedLease.getStartDate());
                    lease.setEndDate(updatedLease.getEndDate());
                    lease.setRentAmount(updatedLease.getRentAmount());
                    return ResponseEntity.ok(leaseRepository.save(lease));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/leases/{id}")
    public ResponseEntity<Void> deleteLease(@PathVariable Long id) {
        leaseRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}