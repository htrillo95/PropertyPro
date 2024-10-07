package com.hector.propertypro.propertypro.controller;

import com.hector.propertypro.propertypro.model.Property;
import com.hector.propertypro.propertypro.repository.PropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/properties")
public class PropertyController {

    private final PropertyRepository propertyRepository;

    @Autowired
    public PropertyController(PropertyRepository propertyRepository) {
        this.propertyRepository = propertyRepository;
    }

    // Get all properties - public endpoint for displaying all properties
    @GetMapping
    public ResponseEntity<List<Property>> getAllProperties() {
        List<Property> properties = propertyRepository.findAll();
        return ResponseEntity.ok(properties);
    }

    // Get a property by ID
    @GetMapping("/{id}")
    public ResponseEntity<Property> getPropertyById(@PathVariable Long id) {
        Optional<Property> property = propertyRepository.findById(id);
        return property.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Add a new property
    @PostMapping
    public ResponseEntity<Property> addProperty(@RequestBody Map<String, Object> request) {
        // Fetch details from request body
        String title = (String) request.get("title");
        String description = (String) request.get("description");
        String address = (String) request.get("address");
        String listingUrl = (String) request.get("listingUrl");
        String imageUrl = (String) request.get("imageUrl");

        // Handle rent amount as BigDecimal
        BigDecimal rentAmount = new BigDecimal(request.get("rent_amount").toString());

        // Handle other integer fields
        int bedrooms = Integer.parseInt(request.get("bedrooms").toString());
        int bathrooms = Integer.parseInt(request.get("bathrooms").toString());
        String type = (String) request.get("type");

        // Create a new Property object and populate its fields
        Property property = new Property();
        property.setTitle(title);
        property.setDescription(description);
        property.setAddress(address);
        property.setListingUrl(listingUrl);
        property.setImageUrl(imageUrl);
        property.setRentAmount(rentAmount); // Set rent amount as BigDecimal
        property.setBedrooms(bedrooms); // Convert to int
        property.setBathrooms(bathrooms); // Convert to int
        property.setType(type);

        // Save the new property
        Property savedProperty = propertyRepository.save(property);
        return ResponseEntity.ok(savedProperty);
    }

    // Update a property by ID
    @PutMapping("/{id}")
    public ResponseEntity<Property> updateProperty(@PathVariable Long id, @RequestBody Property updatedProperty) {
        return propertyRepository.findById(id)
                .map(property -> {
                    // Update property details
                    property.setTitle(updatedProperty.getTitle());
                    property.setDescription(updatedProperty.getDescription());
                    property.setAddress(updatedProperty.getAddress());
                    property.setListingUrl(updatedProperty.getListingUrl());
                    property.setImageUrl(updatedProperty.getImageUrl());
                    property.setRentAmount(updatedProperty.getRentAmount());
                    property.setBedrooms(updatedProperty.getBedrooms());
                    property.setBathrooms(updatedProperty.getBathrooms());
                    property.setType(updatedProperty.getType());

                    // Save and return the updated property
                    Property savedProperty = propertyRepository.save(property);
                    return ResponseEntity.ok(savedProperty);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Delete a property by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProperty(@PathVariable Long id) {
        if (propertyRepository.existsById(id)) {
            propertyRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}