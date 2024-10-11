package com.hector.propertypro.propertypro.service;

import com.hector.propertypro.propertypro.model.Lease;
import com.hector.propertypro.propertypro.repository.LeaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.List;

@Service
public class LeaseService {

    @Autowired
    private LeaseRepository leaseRepository;

    // Retrieve a lease by its ID
    public Optional<Lease> getLeaseById(Long id) {
        return leaseRepository.findById(id);
    }

    // Retrieve lease by User ID (tenantId in this case)
    public Optional<Lease> getLeaseByUserId(Long userId) {
        return leaseRepository.findByTenantId(userId).stream().findFirst(); // Assuming one lease per user
    }

    // Retrieve lease by Property ID
    public List<Lease> getLeasesByPropertyId(Long propertyId) {
        return leaseRepository.findByPropertyId(propertyId);
    }

    // Save a new lease
    public Lease saveLease(Lease lease) {
        return leaseRepository.save(lease);
    }

    // Update an existing lease
    public Lease updateLease(Long id, Lease leaseDetails) {
        return leaseRepository.findById(id).map(lease -> {
            lease.setStartDate(leaseDetails.getStartDate());
            lease.setEndDate(leaseDetails.getEndDate());
            lease.setRentAmount(leaseDetails.getRentAmount());
            lease.setTenant(leaseDetails.getTenant());
            lease.setProperty(leaseDetails.getProperty());
            return leaseRepository.save(lease);
        }).orElseThrow(() -> new RuntimeException("Lease not found with id " + id));
    }

    // Delete a lease
    public void deleteLease(Long id) {
        leaseRepository.deleteById(id);
    }
}