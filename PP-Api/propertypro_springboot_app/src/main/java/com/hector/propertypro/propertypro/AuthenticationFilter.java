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
    AuthController authController;

    // Whitelist
    private static final List<String> whitelist = Arrays.asList("/", "/api", "/register", "/login", "/users/register", "/users/login", "/send-email");

    private static boolean isWhitelisted(String path) {
        for (String pathRoot : whitelist) {
            if (path.equals("/") || path.startsWith(pathRoot)) {
                return true;
            }
        }
        return false;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws IOException {
        String requestURI = request.getRequestURI();
        String method = request.getMethod();
        System.out.println("Request URI: " + requestURI + ", Method: " + method); // Debug log

        if (isWhitelisted(requestURI)) {
            return true;
        }

        HttpSession session = request.getSession();
        User user = authController.getUserFromSession(session);

        if (user != null) {
            System.out.println("User authenticated: " + user.getUsername()); // Debug log
            System.out.println("User role: " + user.getRole()); // Debug log
            return true;
        }

        System.out.println("User not authenticated, redirecting to login"); // Debug log
        response.sendRedirect("/login");

        return false;
    }
}