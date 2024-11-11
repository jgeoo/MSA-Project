package com.helpquest.controller;

import com.helpquest.service.BadgeService;


import com.helpquest.entity.Badge;
import com.helpquest.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/badges")
public class BadgeController {
    @Autowired
    private BadgeService badgeService;

    @GetMapping
    public List<Badge> getAllBadges() { return badgeService.getAllBadges(); }

    @GetMapping("/{id}")
    public ResponseEntity<Badge> getBadgeById(
            @PathVariable Long id) {
        return badgeService.getBadgeById(id).map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Badge createBadge(@RequestBody Badge badge) { return badgeService.createBadge(badge); }

    @DeleteMapping("/{id}")
    public void deleteBadge(@PathVariable Long id) { badgeService.deleteBadge(id); }
}
