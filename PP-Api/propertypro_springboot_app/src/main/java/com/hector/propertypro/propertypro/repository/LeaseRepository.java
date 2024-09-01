package com.hector.propertypro.propertypro.repository;

import com.hector.propertypro.propertypro.model.Lease;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface LeaseRepository extends JpaRepository<Lease, Long> {
    List<Lease> findByEndDate(LocalDate endDate);

    List<Lease> findByStartDate(LocalDate startDate);

    List<Lease> findByPropertyId(Long propertyId);

    List<Lease> findByTenantId(Long tenantId);
    // Custom query methods can be added here if needed
}