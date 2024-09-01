package com.hector.propertypro.propertypro.service;

import com.hector.propertypro.propertypro.model.Property;
import com.hector.propertypro.propertypro.repository.PropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PropertyService {

    private final PropertyRepository propertyRepository;

    @Autowired
    public PropertyService(PropertyRepository propertyRepository) {
        this.propertyRepository = propertyRepository;
    }

    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }

    public Optional<Property> getPropertyById(Long id) {
        return propertyRepository.findById(id);
    }

    public List<Property> getPropertiesByAddress(String address) {
        return propertyRepository.findByAddressContainingIgnoreCase(address);
    }

    public List<Property> getPropertiesByType(String type) {
        return propertyRepository.findByType(type);
    }

    public Property saveProperty(Property property) {
        return propertyRepository.save(property);
    }

    public void deleteProperty(Long id) {
        propertyRepository.deleteById(id);
    }

    public void deleteMultipleProperties(List<Long> ids) {
        propertyRepository.deleteAllById(ids);
    }

    public void deleteAllProperties() {
        propertyRepository.deleteAll();
    }

    public List<Property> getPropertiesByRentAmountRange(Double minRent, Double maxRent) {
        return propertyRepository.findByRentAmountBetween(minRent, maxRent);
    }

    public Optional<Property> updateProperty(Long id, Property propertyDetails) {
        return propertyRepository.findById(id).map(property -> {
            property.setAddress(propertyDetails.getAddress());
            property.setType(propertyDetails.getType());
            property.setRentAmount(propertyDetails.getRentAmount());
            property.setBedrooms(propertyDetails.getBedrooms());
            property.setBathrooms(propertyDetails.getBathrooms());
            return propertyRepository.save(property);
        });
    }
}