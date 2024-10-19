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
        String method = request.getMethod();
        System.out.println("Request URI: " + requestURI + ", Method: " + method); // Debug log

        if (isWhitelisted(requestURI)) {
            System.out.println("Whitelisted path: " + requestURI); // Debug log
            return true;
        }

        HttpSession session = request.getSession(false);  // Get session, but don't create a new one
        if (session != null) {
            User user = authController.getUserFromSession(session);  // Get user from session
            if (user != null) {
                System.out.println("User authenticated: " + user.getUsername());  // Debug log
                return true;  // User is authenticated
            }
        }

        // If no session or user, redirect to login
        System.out.println("User not authenticated, redirecting to login");  // Debug log
        response.sendRedirect("/login");
        return false;
    }
}