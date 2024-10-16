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

    // Set user in session
    private static void setUserInSession(HttpSession session, User user) {
        session.setAttribute(userSessionKey, user.getId());
        System.out.println("User ID set in session: " + user.getId());
        System.out.println("Session ID: " + session.getId());
    }

    // Get user from session
    public User getUserFromSession(HttpSession session) {
        Object userIdObj = session.getAttribute(userSessionKey);
        System.out.println("Session ID: " + session.getId());
        System.out.println("User session key: " + userIdObj);

        if (userIdObj == null || !(userIdObj instanceof Long)) {
            System.out.println("Invalid or missing user in session");
            return null;
        }

        Long userId = (Long) userIdObj;
        Optional<User> userOpt = userRepository.findById(userId);
        System.out.println("User found: " + userOpt.isPresent());

        return userOpt.orElse(null);
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> registerUser(
            @RequestBody @Valid RegistrationFormDTO registrationFormDTO, Errors errors, HttpServletRequest request) {
        Map<String, String> response = new HashMap<>();

        if (errors.hasErrors()) {
            response.put("message", "Validation errors");
            System.out.println("Validation errors: " + errors.getAllErrors());
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        if (userRepository.findByUsername(registrationFormDTO.getUsername()).isPresent()) {
            response.put("message", "Username already exists");
            System.out.println("User exists: " + registrationFormDTO.getUsername());
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        String hashedPassword = passwordEncoder.encode(registrationFormDTO.getPassword());
        User user = new User(registrationFormDTO.getName(), registrationFormDTO.getEmail(), registrationFormDTO.getUsername(), hashedPassword, "TENANT");

        Tenant tenant = new Tenant();
        tenant.setName(registrationFormDTO.getName());
        tenant.setEmail(registrationFormDTO.getEmail());
        tenant.setPhone(registrationFormDTO.getPhone());
        tenant.setUser(user);
        user.setTenant(tenant);

        userRepository.save(user);
        setUserInSession(request.getSession(), user);

        response.put("message", "User registered successfully");
        System.out.println("User registered: " + user.getUsername());

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> loginUser(
            @RequestBody @Valid LoginRequest loginRequest, Errors errors, HttpServletRequest request) {
        Map<String, String> response = new HashMap<>();

        if (errors.hasErrors()) {
            response.put("message", "Validation errors");
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        Optional<User> userOpt = userRepository.findByUsername(loginRequest.getUsername());
        if (userOpt.isEmpty()) {
            logger.info("User not found: " + loginRequest.getUsername());
            response.put("message", "Invalid credentials");
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }

        User user = userOpt.get();
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            response.put("message", "Invalid credentials");
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }

        setUserInSession(request.getSession(), user);
        response.put("message", "Login successful");
        response.put("role", user.getRole());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}