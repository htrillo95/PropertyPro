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
        session.setAttribute("userId", user.getId());
        session.setAttribute("userRole", user.getRole());  // Store user role in the session
        System.out.println("User ID set in session: " + user.getId());
        System.out.println("User Role set in session: " + user.getRole());
        System.out.println("Session ID: " + session.getId());
    }

    // Set admin in session
    private static void setAdminInSession(HttpSession session) {
        session.setAttribute("userId", 0L);  // Set a hardcoded ID for admin (or leave as a known value)
        session.setAttribute("userRole", "admin");
        System.out.println("Admin session set");
    }

    // Clear session to avoid session conflicts
    private void clearSession(HttpSession session) {
        session.invalidate();  // Invalidate the current session
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
        setUserInSession(request.getSession(), user);  // Store user in session after registration

        response.put("message", "User registered successfully");
        response.put("sessionId", request.getSession().getId());  // Optional: Send session ID for debugging
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

        clearSession(request.getSession());  // Clear previous session to avoid conflicts

        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();

        // Admin login logic using hardcoded credentials
        if (username.equals("admin")) {
            Optional<User> adminUser = userRepository.findByUsername(username);
            if (adminUser.isEmpty() || !passwordEncoder.matches(password, adminUser.get().getPassword())) {
                response.put("message", "Invalid credentials");
                return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
            }

            setAdminInSession(request.getSession());
            response.put("message", "Admin login successful");
            response.put("role", "admin");
            return new ResponseEntity<>(response, HttpStatus.OK);
        }

        // Tenant login handling
        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isEmpty() || !passwordEncoder.matches(password, userOpt.get().getPassword())) {
            response.put("message", "Invalid credentials");
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }

        User user = userOpt.get();
        setUserInSession(request.getSession(), user);  // Tenant session handling

        response.put("message", "Login successful");
        response.put("role", user.getRole());
        response.put("sessionId", request.getSession().getId());  // Send session ID for debugging
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}