package com.hector.propertypro.propertypro.controller;

import com.hector.propertypro.propertypro.model.Property;
import com.hector.propertypro.propertypro.service.PropertyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/properties")
public class PropertyController {

    private final PropertyService propertyService;

    @Autowired
    public PropertyController(PropertyService propertyService) {
        this.propertyService = propertyService;
    }

    @GetMapping
    public List<Property> getAllProperties() {
        return propertyService.getAllProperties();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Property> getPropertyById(@PathVariable Long id) {
        return propertyService.getPropertyById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Property createProperty(@RequestBody Property property) {
        return propertyService.saveProperty(property);
    }

    @PostMapping("/batch")
    public ResponseEntity<List<Property>> createMultipleProperties(@RequestBody List<Property> properties) {
        List<Property> savedProperties = properties.stream()
                .map(propertyService::saveProperty)
                .collect(Collectors.toList());
        return ResponseEntity.ok(savedProperties);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Property> updateProperty(@PathVariable Long id, @RequestBody Property property) {
        return propertyService.getPropertyById(id)
                .map(existingProperty -> {
                    property.setId(id);
                    return ResponseEntity.ok(propertyService.saveProperty(property));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProperty(@PathVariable Long id) {
        propertyService.deleteProperty(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteMultipleProperties(@RequestBody List<Long> ids) {
        propertyService.deleteMultipleProperties(ids);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/deleteAll")
    public ResponseEntity<Void> deleteAllProperties() {
        propertyService.deleteAllProperties();
        return ResponseEntity.noContent().build();
    }

}
