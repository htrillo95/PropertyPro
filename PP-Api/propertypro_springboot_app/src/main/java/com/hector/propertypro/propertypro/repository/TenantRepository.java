package com.hector.propertypro.propertypro.repository;

import com.hector.propertypro.propertypro.model.Tenant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TenantRepository extends JpaRepository<Tenant, Long> {
    List<Tenant> findByEmailContainingIgnoreCase(String email);

    List<Tenant> findByNameContainingIgnoreCase(String name);
}