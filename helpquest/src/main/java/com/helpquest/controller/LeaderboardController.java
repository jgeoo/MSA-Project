package com.helpquest.controller;

import com.helpquest.entity.Leaderboard;
import com.helpquest.service.LeaderboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leaderboard")
public class LeaderboardController {

    private final LeaderboardService leaderboardService;

    public LeaderboardController(LeaderboardService leaderboardService) {
        this.leaderboardService = leaderboardService;
    }

    @GetMapping
    public List<Leaderboard> getAllLeaderboards() {
        return leaderboardService.getAllLeaderboards();
    }

    @GetMapping("/{userId}")
    public ResponseEntity<Leaderboard> getLeaderboardByUserId(@PathVariable Long userId) {
        return leaderboardService.getLeaderboardByUserId(userId)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Leaderboard createLeaderboard(@RequestBody Leaderboard leaderboard) {
        return leaderboardService.createLeaderboard(leaderboard);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<Leaderboard> updateLeaderboard(@PathVariable Long userId, @RequestBody Leaderboard leaderboard) {
        Leaderboard updatedLeaderboard = leaderboardService.updateLeaderboard(userId, leaderboard);
        return ResponseEntity.ok(updatedLeaderboard);
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteLeaderboard(@PathVariable Long userId) {
        leaderboardService.deleteLeaderboard(userId);
        return ResponseEntity.noContent().build();
    }
}
