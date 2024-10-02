package com.hector.propertypro.propertypro.util; // Use the appropriate package name

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordHasher {

    public static void main(String[] args) {
        // Create a password encoder instance
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        // Set the plain-text password you want to hash
        String rawPassword = "adminpassword"; // Replace this with your desired password

        // Generate the hashed password
        String hashedPassword = passwordEncoder.encode(rawPassword);

        // Print the hashed password
        System.out.println("Hashed password: " + hashedPassword);
    }
}