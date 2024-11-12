package com.helpquest.controller;

import com.helpquest.entity.UserBadge;
import com.helpquest.service.UserBadgeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user-badges")
public class UserBadgeController {

    private final UserBadgeService userBadgeService;

    @Autowired
    public UserBadgeController(UserBadgeService userBadgeService) {
        this.userBadgeService = userBadgeService;
    }

    // Get all user badges
    @GetMapping
    public List<UserBadge> getAllUserBadges() {
        return userBadgeService.getAllUserBadges();
    }

    // Get user badge by composite key
    @GetMapping("/{userId}/{badgeId}")
    public ResponseEntity<UserBadge> getUserBadgeById(@PathVariable Long userId, @PathVariable Long badgeId) {
        Optional<UserBadge> userBadge = userBadgeService.getUserBadgeById(userId, badgeId);
        return userBadge.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Create or update a user badge
    @PostMapping
    public ResponseEntity<UserBadge> createOrUpdateUserBadge(@RequestBody UserBadge userBadge) {
        UserBadge savedUserBadge = userBadgeService.saveUserBadge(userBadge);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUserBadge);
    }

    // Delete a user badge by composite key
    @DeleteMapping("/{userId}/{badgeId}")
    public ResponseEntity<Void> deleteUserBadge(@PathVariable Long userId, @PathVariable Long badgeId) {
        userBadgeService.deleteUserBadge(userId, badgeId);
        return ResponseEntity.noContent().build();
    }
}

