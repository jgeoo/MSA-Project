package com.helpquest.service;

import com.helpquest.entity.Leaderboard;
import com.helpquest.repository.LeaderboardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LeaderboardService {

    private final LeaderboardRepository leaderboardRepository;

    public LeaderboardService(LeaderboardRepository leaderboardRepository) {
        this.leaderboardRepository = leaderboardRepository;
    }

    public List<Leaderboard> getAllLeaderboards() {
        return leaderboardRepository.findAll();
    }

    public Optional<Leaderboard> getLeaderboardByUserId(Long userId) {
        return leaderboardRepository.findById(userId);
    }

    public Leaderboard createLeaderboard(Leaderboard leaderboard) {
        return leaderboardRepository.save(leaderboard);
    }

    public Leaderboard updateLeaderboard(Long userId, Leaderboard updatedLeaderboard) {
        return leaderboardRepository.findById(userId)
                .map(existingLeaderboard -> {
                    existingLeaderboard.setTotalPoints(updatedLeaderboard.getTotalPoints());
                    existingLeaderboard.setRank(updatedLeaderboard.getRank());
                    existingLeaderboard.setLastUpdated(updatedLeaderboard.getLastUpdated());
                    return leaderboardRepository.save(existingLeaderboard);
                })
                .orElseGet(() -> leaderboardRepository.save(updatedLeaderboard));
    }

    public void deleteLeaderboard(Long userId) {
        leaderboardRepository.deleteById(userId);
    }
}
