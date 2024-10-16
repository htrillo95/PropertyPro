package com.hector.propertypro.propertypro;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

// Exclude SecurityAutoConfiguration
@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
public class PropertyproApplication {

	public static void main(String[] args) {
		SpringApplication.run(PropertyproApplication.class, args);
	}
}