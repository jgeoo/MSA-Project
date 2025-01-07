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

    public User loginUser(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Verify password
        if (!encoder.matches(password, user.getPasswordHash())) {
            throw new RuntimeException("Invalid password");
        }

        return user;
    }
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

        user.setPasswordHash(encoder.encode(user.getPasswordHash()));
        return userRepository.save(user);
    }
}
