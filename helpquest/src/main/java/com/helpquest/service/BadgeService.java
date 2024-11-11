package com.helpquest.service;

import com.helpquest.entity.Badge;
import com.helpquest.repository.BadgeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BadgeService {
    @Autowired
    private BadgeRepository badgeRepository;

    public List<Badge> getAllBadges() { return badgeRepository.findAll(); }
    public Optional<Badge> getBadgeById(Long id) { return badgeRepository.findById(id); }
    public Badge createBadge(Badge badge) { return badgeRepository.save(badge); }
    public void deleteBadge(Long id) { badgeRepository.deleteById(id); }
}

