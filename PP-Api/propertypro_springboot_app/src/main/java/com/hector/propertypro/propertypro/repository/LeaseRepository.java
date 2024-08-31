package com.hector.propertypro.propertypro.repository;

import com.hector.propertypro.propertypro.model.Lease;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LeaseRepository extends JpaRepository<Lease, Long> {
    // Custom query methods can be added here if needed
}