package com.hector.propertypro.propertypro.service;

import com.hector.propertypro.propertypro.model.Lease;
import com.hector.propertypro.propertypro.repository.LeaseRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class LeaseService {
    private final LeaseRepository leaseRepository;

    public LeaseService(LeaseRepository leaseRepository) {
        this.leaseRepository = leaseRepository;
    }

    public List<Lease> getAllLeases() {
        return leaseRepository.findAll();
    }

    public Optional<Lease> getLeaseById(Long id) {
        return leaseRepository.findById(id);
    }

    public List<Lease> getLeasesByTenantId(Long tenantId) {
        return leaseRepository.findByTenantId(tenantId);
    }

    public List<Lease> getLeasesByPropertyId(Long propertyId) {
        return leaseRepository.findByPropertyId(propertyId);
    }

    public List<Lease> getLeasesByStartDate(LocalDate startDate) {
        return leaseRepository.findByStartDate(startDate);
    }

    public List<Lease> getLeasesByEndDate(LocalDate endDate) {
        return leaseRepository.findByEndDate(endDate);
    }

    public Lease saveLease(Lease lease) {
        return leaseRepository.save(lease);
    }

    public Optional<Lease> updateLease(Long id, Lease leaseDetails) {
        return leaseRepository.findById(id).map(lease -> {
            lease.setStartDate(leaseDetails.getStartDate());
            lease.setEndDate(leaseDetails.getEndDate());
            lease.setRentAmount(leaseDetails.getRentAmount());
            lease.setTenant(leaseDetails.getTenant());
            lease.setProperty(leaseDetails.getProperty());
            return leaseRepository.save(lease);
        });
    }

    public void deleteLease(Long id) {
        leaseRepository.deleteById(id);
    }

    public void deleteMultipleLeases(List<Long> ids) {
        leaseRepository.deleteAllById(ids);
    }

    public void deleteAllLeases() {
        leaseRepository.deleteAll();
    }
}