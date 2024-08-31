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
}