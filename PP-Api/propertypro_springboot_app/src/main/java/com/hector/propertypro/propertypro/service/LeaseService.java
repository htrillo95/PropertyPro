package com.hector.propertypro.propertypro.service;

import com.hector.propertypro.propertypro.model.Lease;
import com.hector.propertypro.propertypro.repository.LeaseRepository;
import org.springframework.stereotype.Service;

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

    public Lease saveLease(Lease lease) {
        return leaseRepository.save(lease);
    }

    public void deleteLease(Long id) {
        leaseRepository.deleteById(id);
    }

    public void deleteMultipleLeases(List<Long> ids) {
        leaseRepository.deleteAllById(ids);
    }
}