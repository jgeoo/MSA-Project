package com.helpquest.service;

import com.helpquest.entity.CompanyLeaderboard;
import com.helpquest.repository.CompanyLeaderboardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CompanyLeaderboardService {

    @Autowired
    private CompanyLeaderboardRepository companyLeaderboardRepository;

    public List<CompanyLeaderboard> getAllCompanyLeaderboards() {
        return companyLeaderboardRepository.findAll();
    }

    public Optional<CompanyLeaderboard> getCompanyLeaderboardByCompanyId(Long companyId) {
        return companyLeaderboardRepository.findById(companyId);
    }

    public CompanyLeaderboard createCompanyLeaderboard(CompanyLeaderboard companyLeaderboard) {
        return companyLeaderboardRepository.save(companyLeaderboard);
    }

    public CompanyLeaderboard updateCompanyLeaderboard(Long companyId, CompanyLeaderboard updatedLeaderboard) {
        return companyLeaderboardRepository.findById(companyId)
                .map(existingLeaderboard -> {
                    existingLeaderboard.setTotalPoints(updatedLeaderboard.getTotalPoints());
                    existingLeaderboard.setRank(updatedLeaderboard.getRank());
                    existingLeaderboard.setLastUpdated(updatedLeaderboard.getLastUpdated());
                    return companyLeaderboardRepository.save(existingLeaderboard);
                })
                .orElseGet(() -> companyLeaderboardRepository.save(updatedLeaderboard));
    }

    public void deleteCompanyLeaderboard(Long companyId) {
        companyLeaderboardRepository.deleteById(companyId);
    }
}
