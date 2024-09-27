package com.hector.propertypro.propertypro.controller;

import com.hector.propertypro.propertypro.dto.LoginRequest;
import com.hector.propertypro.propertypro.dto.RegistrationFormDTO;
import com.hector.propertypro.propertypro.model.User;
import com.hector.propertypro.propertypro.repository.UserRepository; // Import your repository
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository; // Use the repository now

    private static final String userSessionKey = "user";
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private static final Logger logger = Logger.getLogger(AuthController.class.getName());

    @Autowired
    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Helper method to set user in session
    private static void setUserInSession(HttpSession session, User user) {
        session.setAttribute(userSessionKey, user.getId());
    }

    // Get User from Session
    public User getUserFromSession(HttpSession session) {
        Long userId = (Long) session.getAttribute(userSessionKey);
        if (userId == null) {
            return null;
        }
        Optional<User> userOpt = userRepository.findById(userId); // Use repository
        return userOpt.orElse(null);
    }

    // Register a new user (tenant-only)
    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> processRegistrationForm(@RequestBody @Valid RegistrationFormDTO registrationFormDTO, Errors errors, HttpServletRequest request) {
        Map<String, String> response = new HashMap<>();
        if (errors.hasErrors()) {
            response.put("message", "Validation errors");
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        Optional<User> existingUser = userRepository.findByUsername(registrationFormDTO.getUsername()); // Use repository
        if (existingUser.isPresent()) {
            response.put("message", "A user with that username already exists");
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        // Set default role as "TENANT" for public registrations
        String role = "TENANT";
        User newUser = new User(registrationFormDTO.getName(), registrationFormDTO.getEmail(), registrationFormDTO.getUsername(), passwordEncoder.encode(registrationFormDTO.getPassword()), role);
        userRepository.save(newUser); // Use repository
        setUserInSession(request.getSession(), newUser);

        response.put("message", "User registered successfully");
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // Login user
//    @PostMapping("/login")
//    public ResponseEntity<Map<String, String>> processLoginForm(@RequestBody @Valid LoginRequest loginRequest, Errors errors, HttpServletRequest request) {
//        Map<String, String> response = new HashMap<>();
//        if (errors.hasErrors()) {
//            response.put("message", "Validation errors");
//            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
//        }
//
//        Optional<User> userOpt = userRepository.findByUsername(loginRequest.getUsername()); // Use repository
//        if (userOpt.isEmpty()) {
//            response.put("message", "Credentials invalid");
//            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
//        }
//
//        User user = userOpt.get();
//        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
//            response.put("message", "Credentials invalid");
//            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
//        }
//
//        setUserInSession(request.getSession(), user);
//
//        response.put("message", "Login successful");
//        return new ResponseEntity<>(response, HttpStatus.OK);
//    }

    // Login user
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> processLoginForm(@RequestBody @Valid LoginRequest loginRequest, Errors errors, HttpServletRequest request) {
        Map<String, String> response = new HashMap<>();
        if (errors.hasErrors()) {
            response.put("message", "Validation errors");
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        // Check user by username
        Optional<User> userOpt = userRepository.findByUsername(loginRequest.getUsername()); // Ensure this is the username
        if (userOpt.isEmpty()) {
            response.put("message", "Credentials invalid");
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }

        User user = userOpt.get();
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            response.put("message", "Credentials invalid");
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }

        setUserInSession(request.getSession(), user);

        // Pass back the user's role for frontend to handle redirection
        response.put("message", "Login successful");
        response.put("role", user.getRole()); // Include the role
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // Logout user
    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {
        request.getSession().invalidate();
        return new ResponseEntity<>("User logged out successfully", HttpStatus.OK);
    }
}