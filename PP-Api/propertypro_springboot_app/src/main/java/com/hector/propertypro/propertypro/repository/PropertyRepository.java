package com.hector.propertypro.propertypro.repository;

import com.hector.propertypro.propertypro.model.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PropertyRepository extends JpaRepository<Property, Long> {

    List<Property> findByRentAmountBetween(Double minRent, Double maxRent);

    List<Property> findByAddressContainingIgnoreCase(String address);

    List<Property> findByType(String type);
}