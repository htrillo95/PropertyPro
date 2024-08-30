package com.hector.propertypro.propertypro.repository;

import com.hector.propertypro.propertypro.model.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PropertyRepository extends JpaRepository<Property, Long> {
    // You can add custom query methods here if needed
}