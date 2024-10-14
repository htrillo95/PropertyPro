package com.hector.propertypro.propertypro.controller;

import com.hector.propertypro.propertypro.dto.LoginRequest;
import com.hector.propertypro.propertypro.dto.RegistrationFormDTO;
import com.hector.propertypro.propertypro.model.User;
import com.hector.propertypro.propertypro.model.Tenant;
import com.hector.propertypro.propertypro.repository.UserRepository;
import com.hector.propertypro.propertypro.repository.TenantRepository;
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
    private UserRepository userRepository;

    @Autowired
    private TenantRepository tenantRepository; // Inject TenantRepository

    private static final String userSessionKey = "user";
    private static final Logger logger = Logger.getLogger(AuthController.class.getName());

    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public AuthController(UserRepository userRepository, TenantRepository tenantRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.tenantRepository = tenantRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Helper method to set user in session
    private static void setUserInSession(HttpSession session, User user) {
        session.setAttribute(userSessionKey, user.getId());
    }

    // Register a new user (tenant-only)
    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> processRegistrationForm(
            @RequestBody @Valid RegistrationFormDTO registrationFormDTO,
            Errors errors, HttpServletRequest request) {

        Map<String, String> response = new HashMap<>();

        // Check for validation errors
        if (errors.hasErrors()) {
            response.put("message", "Validation errors");
            System.out.println("Validation errors: " + errors.getAllErrors()); // Debug log
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        // Check if user already exists by username
        Optional<User> existingUser = userRepository.findByUsername(registrationFormDTO.getUsername());
        if (existingUser.isPresent()) {
            response.put("message", "A user with that username already exists");
            System.out.println("User already exists: " + registrationFormDTO.getUsername()); // Debug log
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        // Set default role as "TENANT"
        String role = "TENANT";
        String hashedPassword = passwordEncoder.encode(registrationFormDTO.getPassword());

        // Create new User object
        User newUser = new User(
                registrationFormDTO.getName(),
                registrationFormDTO.getEmail(),
                registrationFormDTO.getUsername(),
                hashedPassword,
                role
        );

        // Create new Tenant object and link it to the User
        Tenant newTenant = new Tenant();
        newTenant.setName(registrationFormDTO.getName());
        newTenant.setEmail(registrationFormDTO.getEmail());
        newTenant.setPhone(registrationFormDTO.getPhone()); // Set phone field
        newTenant.setUser(newUser); // Establish the relationship
        newUser.setTenant(newTenant); // Bi-directional link

        System.out.println("New tenant created: " + newTenant); // Debug log

        // Save the User (and Tenant with CascadeType.ALL)
        userRepository.save(newUser);
        setUserInSession(request.getSession(), newUser);

        response.put("message", "User registered successfully");
        System.out.println("User registered successfully: " + newUser.getUsername()); // Debug log

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // Login user
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> processLoginForm(@RequestBody @Valid LoginRequest loginRequest, Errors errors, HttpServletRequest request) {
        Map<String, String> response = new HashMap<>();
        if (errors.hasErrors()) {
            response.put("message", "Validation errors");
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        // Check user by username
        Optional<User> userOpt = userRepository.findByUsername(loginRequest.getUsername());
        if (userOpt.isEmpty()) {
            logger.info("User not found: " + loginRequest.getUsername());
            response.put("message", "Credentials invalid");
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }

        User user = userOpt.get();
        logger.info("User found in DB: " + user.getUsername());
        logger.info("Password entered: " + loginRequest.getPassword());
        logger.info("Password in DB: " + user.getPassword());

        // Check if password matches
        boolean passwordMatches = passwordEncoder.matches(loginRequest.getPassword(), user.getPassword());
        logger.info("Password matches: " + passwordMatches);

        if (!passwordMatches) {
            response.put("message", "Credentials invalid");
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }

        setUserInSession(request.getSession(), user);

        // Pass back the user's role for frontend to handle redirection
        response.put("message", "Login successful");
        response.put("role", user.getRole());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // Logout user
    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {
        request.getSession().invalidate();
        return new ResponseEntity<>("User logged out successfully", HttpStatus.OK);
    }

    public User getUserFromSession(HttpSession session) {
        Object userIdObj = session.getAttribute(userSessionKey);

        // Log session contents to debug session data
        System.out.println("Session ID: " + session.getId());
        System.out.println("User session key value: " + userIdObj);

        if (userIdObj == null || !(userIdObj instanceof Long)) {
            System.out.println("User session key not found or invalid");
            return null;
        }

        Long userId = (Long) userIdObj;
        Optional<User> userOpt = userRepository.findById(userId);

        System.out.println("User found in DB: " + userOpt.isPresent()); // Debug: User existence

        return userOpt.orElse(null);
    }
}