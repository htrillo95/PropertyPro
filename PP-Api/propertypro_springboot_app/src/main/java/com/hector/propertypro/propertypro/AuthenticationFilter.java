package com.hector.propertypro.propertypro;

import com.hector.propertypro.propertypro.controller.AuthController;
import com.hector.propertypro.propertypro.model.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@Component
public class AuthenticationFilter implements HandlerInterceptor {

    @Autowired
    private AuthController authController;

    // Whitelisted paths that don't require authentication
    private static final List<String> WHITELIST = Arrays.asList(
            "/", "/api", "/api/auth/register", "/api/auth/login",
            "/users/register", "/users/login", "/send-email"
    );

    private static boolean isWhitelisted(String path) {
        return WHITELIST.stream().anyMatch(path::startsWith);
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws IOException {
        String requestURI = request.getRequestURI();
        System.out.println("Request URI: " + requestURI); // Debug log

        if (isWhitelisted(requestURI)) {
            System.out.println("Whitelisted path: " + requestURI); // Debug log
            return true;  // No authentication needed
        }

        HttpSession session = request.getSession(false);  // Get session, but don't create a new one
        if (session == null || session.getAttribute("userId") == null) {
            System.out.println("User not authenticated or missing user ID");
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "User not authenticated or missing user ID");
            return false;
        }

        // Retrieve role from the session
        String userRole = (String) session.getAttribute("userRole");
        if (userRole == null) {
            System.out.println("User role not found in session");
            response.sendError(HttpServletResponse.SC_FORBIDDEN, "User role not found");
            return false;
        }

        // Check if the user is trying to access the admin panel or tenant panel
        if (requestURI.startsWith("/admin") && !"ADMIN".equals(userRole)) {
            System.out.println("User does not have permission to access admin resources");
            response.sendError(HttpServletResponse.SC_FORBIDDEN, "You do not have permission to access this resource");
            return false;
        }
        if (requestURI.startsWith("/tenant") && !"TENANT".equals(userRole)) {
            System.out.println("User does not have permission to access tenant resources");
            response.sendError(HttpServletResponse.SC_FORBIDDEN, "You do not have permission to access this resource");
            return false;
        }

        // If user is authenticated and has the correct role
        System.out.println("User authenticated with role: " + userRole);
        return true;
    }
}