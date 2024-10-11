package com.hector.propertypro.propertypro.controller;

import com.hector.propertypro.propertypro.model.User;
import com.hector.propertypro.propertypro.model.Property;
import com.hector.propertypro.propertypro.model.Lease;
import com.hector.propertypro.propertypro.model.Role;
import com.hector.propertypro.propertypro.repository.UserRepository;
import com.hector.propertypro.propertypro.repository.PropertyRepository;
import com.hector.propertypro.propertypro.service.LeaseService;
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
    private LeaseService leaseService;

    // --- User Management ---

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }

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

    @GetMapping("/properties")
    public ResponseEntity<List<Property>> getAllProperties() {
        List<Property> properties = propertyRepository.findAll();
        return ResponseEntity.ok(properties);
    }

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

    // --- Lease Management ---

    @PostMapping("/leases")
    public ResponseEntity<Lease> addLease(@RequestBody Lease lease) {
        Lease savedLease = leaseService.saveLease(lease);  // Use leaseService
        return ResponseEntity.ok(savedLease);
    }

    @PutMapping("/leases/{id}")
    public ResponseEntity<Lease> updateLease(@PathVariable Long id, @RequestBody Lease updatedLease) {
        Lease updatedLeaseResponse = leaseService.updateLease(id, updatedLease);  // Use leaseService
        return ResponseEntity.ok(updatedLeaseResponse);
    }

    @DeleteMapping("/leases/{id}")
    public ResponseEntity<Void> deleteLease(@PathVariable Long id) {
        leaseService.deleteLease(id);  // Use leaseService
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/leases/{userId}")
    public ResponseEntity<Lease> getLeaseByUserId(@PathVariable Long userId) {
        Optional<Lease> lease = leaseService.getLeaseByUserId(userId);  // Updated to use User ID instead of Tenant ID
        return lease.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
}