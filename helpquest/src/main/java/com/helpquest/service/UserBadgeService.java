package com.helpquest.service;

import com.helpquest.entity.UserBadge;
import com.helpquest.entity.UserBadgePK;
import com.helpquest.repository.UserBadgeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserBadgeService {

    private final UserBadgeRepository userBadgeRepository;

    @Autowired
    public UserBadgeService(UserBadgeRepository userBadgeRepository) {
        this.userBadgeRepository = userBadgeRepository;
    }

    // Get all user badges
    public List<UserBadge> getAllUserBadges() {
        return userBadgeRepository.findAll();
    }

    // Get user badge by composite key (UserBadgePK)
    public Optional<UserBadge> getUserBadgeById(Long userId, Long badgeId) {
        return userBadgeRepository.findById(new UserBadgePK(userId, badgeId));
    }

    // Save or update a user badge
    public UserBadge saveUserBadge(UserBadge userBadge) {
        return userBadgeRepository.save(userBadge);
    }

    // Delete a user badge by composite key
    public void deleteUserBadge(Long userId, Long badgeId) {
        userBadgeRepository.deleteById(new UserBadgePK(userId, badgeId));
    }
}

