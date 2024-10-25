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
    private TenantRepository tenantRepository;

    private static final String userSessionKey = "user";
    private static final Logger logger = Logger.getLogger(AuthController.class.getName());
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public AuthController(UserRepository userRepository, TenantRepository tenantRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.tenantRepository = tenantRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Helper method to set user or admin in session
    private void setUserInSession(HttpSession session, Long userId, String role) {
        session.setAttribute("userId", userId);
        session.setAttribute("userRole", role);
        logger.info("Session set for userId: " + userId + " with role: " + role);
    }

    // Clear session to prevent conflicts
    private void clearSession(HttpSession session) {
        session.invalidate();
        logger.info("Previous session invalidated.");
    }

    // Registration endpoint for tenants
    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> registerUser(
            @RequestBody @Valid RegistrationFormDTO registrationFormDTO, Errors errors, HttpServletRequest request) {
        Map<String, String> response = new HashMap<>();

        if (errors.hasErrors()) {
            response.put("message", "Validation errors");
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        if (userRepository.findByUsername(registrationFormDTO.getUsername()).isPresent()) {
            response.put("message", "Username already exists");
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        String hashedPassword = passwordEncoder.encode(registrationFormDTO.getPassword());
        User user = new User(registrationFormDTO.getName(), registrationFormDTO.getEmail(),
                registrationFormDTO.getUsername(), hashedPassword, "TENANT");

        Tenant tenant = new Tenant();
        tenant.setName(registrationFormDTO.getName());
        tenant.setEmail(registrationFormDTO.getEmail());
        tenant.setUser(user);
        user.setTenant(tenant);

        userRepository.save(user);

        // Set tenant in session after registration
        setUserInSession(request.getSession(), user.getId(), "tenant");

        response.put("message", "User registered successfully");
        response.put("role", "tenant");
        response.put("sessionId", request.getSession().getId());  // Return session ID
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // Login endpoint with separate handling for admin and tenant
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> loginUser(
            @RequestBody @Valid LoginRequest loginRequest, Errors errors, HttpServletRequest request) {
        Map<String, String> response = new HashMap<>();

        if (errors.hasErrors()) {
            response.put("message", "Validation errors");
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        clearSession(request.getSession());  // Clear any previous session to avoid conflicts

        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();

        // Hard-coded admin check
        if ("admin".equals(username)) {
            Optional<User> adminUser = userRepository.findByUsername(username);
            if (adminUser.isEmpty() || !passwordEncoder.matches(password, adminUser.get().getPassword())) {
                response.put("message", "Invalid credentials");
                return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
            }

            // Set admin session
            setUserInSession(request.getSession(), 0L, "admin");
            response.put("message", "Admin login successful");
            response.put("role", "admin");
            response.put("sessionId", request.getSession().getId());  // Return session ID
            return new ResponseEntity<>(response, HttpStatus.OK);
        }

        // Tenant login handling
        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isEmpty() || !passwordEncoder.matches(password, userOpt.get().getPassword())) {
            response.put("message", "Invalid credentials");
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }

        // Set tenant session
        User user = userOpt.get();
        setUserInSession(request.getSession(), user.getId(), "tenant");

        response.put("message", "Login successful");
        response.put("role", "tenant");
        response.put("sessionId", request.getSession().getId());  // Return session ID
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // Optional: A method to check if the user is authenticated
    @GetMapping("/check-session")
    public ResponseEntity<Map<String, Object>> checkSession(HttpSession session) {
        Map<String, Object> response = new HashMap<>();
        if (session.getAttribute("userId") != null) {
            response.put("isAuthenticated", true);
            response.put("userId", session.getAttribute("userId"));
            response.put("userRole", session.getAttribute("userRole"));
            response.put("sessionId", session.getId());
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            response.put("isAuthenticated", false);
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }
    }
}