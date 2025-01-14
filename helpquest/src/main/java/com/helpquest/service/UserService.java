package com.helpquest.service;

import com.helpquest.entity.RoleEnum;
import com.helpquest.entity.User;
import com.helpquest.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private JWTService jwtService;

    @Autowired
    private UserRepository userRepository;
    private BCryptPasswordEncoder encoder  = new BCryptPasswordEncoder(12);

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }
    public Optional<User> getUserByEmail(String email){
        return userRepository.findByEmail(email);
    }

    @Autowired
    AuthenticationManager authManager;

    public String verify(User user) {
        Authentication authentication = authManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPasswordHash()));
        if (authentication.isAuthenticated()) {
            System.out.println(user.getUserId());
            return jwtService.generateToken(user.getEmail());
        } else {
            return "fail";
        }
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public User saveUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already registered");
        }
        if (user.getRole() == null) {
            user.setRole(RoleEnum.INDIVIDUAL);
        }
        user.setTotalPoints(0);
        user.setCreatedAt(LocalDate.now().toString());
        user.setPasswordHash(encoder.encode(user.getPasswordHash()));
        return userRepository.save(user);
    }
    public User updateUser(Long userId, User userDetails) {
        // Fetch the existing user by ID
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isEmpty()) {
            throw new IllegalArgumentException("User not found with ID: " + userId);
        }

        User user = optionalUser.get();

        // Update user fields
        if (userDetails.getName() != null) {
            user.setName(userDetails.getName());
        }
        if (userDetails.getEmail() != null) {
            user.setEmail(userDetails.getEmail());
        }
        if (userDetails.getPasswordHash() != null) {
            user.setPasswordHash(userDetails.getPasswordHash());
        }
        if (userDetails.getRole() != null) {
            user.setRole(userDetails.getRole());
        }
        if (userDetails.getPhoneNumber() != null) {
            user.setPhoneNumber(userDetails.getPhoneNumber());
        }
        if (userDetails.getTotalPoints() != null) {
            user.setTotalPoints(userDetails.getTotalPoints());
        }

        // Save the updated user
        return userRepository.save(user);
    }
}
