package com.hector.propertypro.propertypro.controller;

import com.hector.propertypro.propertypro.model.User;
import com.hector.propertypro.propertypro.model.Property;
import com.hector.propertypro.propertypro.model.Tenant;
import com.hector.propertypro.propertypro.model.Lease;
import com.hector.propertypro.propertypro.model.Role;
import com.hector.propertypro.propertypro.service.UserService;
import com.hector.propertypro.propertypro.service.PropertyService;
import com.hector.propertypro.propertypro.service.TenantService;
import com.hector.propertypro.propertypro.service.LeaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final UserService userService;
    private final PropertyService propertyService;
    private final TenantService tenantService;
    private final LeaseService leaseService;

    @Autowired
    public AdminController(UserService userService, PropertyService propertyService,
                           TenantService tenantService, LeaseService leaseService) {
        this.userService = userService;
        this.propertyService = propertyService;
        this.tenantService = tenantService;
        this.leaseService = leaseService;
    }

    // User Management
    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        return userService.findById(id)
                .map(user -> {
                    user.setUsername(updatedUser.getUsername());
                    user.setEmail(updatedUser.getEmail());
                    user.setRoles(updatedUser.getRoles());
                    return ResponseEntity.ok(userService.saveUser(user));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return userService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/users/{id}/roles")
    public ResponseEntity<User> assignRoleToUser(@PathVariable Long id, @RequestBody Role role) {
        return userService.findById(id)
                .map(user -> {
                    user.getRoles().add(role);
                    return ResponseEntity.ok(userService.saveUser(user));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/users/search")
    public ResponseEntity<User> searchUserByEmail(@RequestParam String email) {
        return userService.findByEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Property Management
    @PutMapping("/properties/{id}")
    public ResponseEntity<Property> updateProperty(@PathVariable Long id, @RequestBody Property updatedProperty) {
        return propertyService.getPropertyById(id)
                .map(property -> {
                    property.setAddress(updatedProperty.getAddress());
                    property.setType(updatedProperty.getType());
                    property.setRentAmount(updatedProperty.getRentAmount());
                    property.setBedrooms(updatedProperty.getBedrooms());
                    property.setBathrooms(updatedProperty.getBathrooms());
                    return ResponseEntity.ok(propertyService.saveProperty(property));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/properties/{id}")
    public ResponseEntity<Void> deleteProperty(@PathVariable Long id) {
        propertyService.deleteProperty(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/properties/search")
    public ResponseEntity<List<Property>> searchPropertyByAddress(@RequestParam String address) {
        return Optional.ofNullable(propertyService.getPropertiesByAddress(address))
                .filter(properties -> !properties.isEmpty())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Tenant Management
    @PutMapping("/tenants/{id}")
    public ResponseEntity<Tenant> updateTenant(@PathVariable Long id, @RequestBody Tenant updatedTenant) {
        return tenantService.getTenantById(id)
                .map(tenant -> {
                    tenant.setName(updatedTenant.getName());
                    tenant.setEmail(updatedTenant.getEmail());
                    tenant.setPhone(updatedTenant.getPhone());
                    return ResponseEntity.ok(tenantService.saveTenant(tenant));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/tenants/{id}")
    public ResponseEntity<Void> deleteTenant(@PathVariable Long id) {
        tenantService.deleteTenant(id);
        return ResponseEntity.noContent().build();
    }

    // Lease Management
    @PutMapping("/leases/{id}")
    public ResponseEntity<Lease> updateLease(@PathVariable Long id, @RequestBody Lease updatedLease) {
        return leaseService.getLeaseById(id)
                .map(lease -> {
                    lease.setStartDate(updatedLease.getStartDate());
                    lease.setEndDate(updatedLease.getEndDate());
                    lease.setRentAmount(updatedLease.getRentAmount());
                    return ResponseEntity.ok(leaseService.saveLease(lease));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/leases/{id}")
    public ResponseEntity<Void> deleteLease(@PathVariable Long id) {
        leaseService.deleteLease(id);
        return ResponseEntity.noContent().build();
    }
}