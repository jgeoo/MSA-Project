package com.helpquest.controller;


import com.helpquest.entity.CompanyLeaderboard;
import com.helpquest.service.CompanyLeaderboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/companyleaderboard")
public class CompanyLeaderboardController {

    @Autowired
    private CompanyLeaderboardService companyLeaderboardService;

    @GetMapping
    public List<CompanyLeaderboard> getAllCompanyLeaderboards() {
        return companyLeaderboardService.getAllCompanyLeaderboards();
    }

    @GetMapping("/{companyId}")
    public ResponseEntity<CompanyLeaderboard> getCompanyLeaderboardByCompanyId(@PathVariable Long companyId) {
        return companyLeaderboardService.getCompanyLeaderboardByCompanyId(companyId)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public CompanyLeaderboard createCompanyLeaderboard(@RequestBody CompanyLeaderboard companyLeaderboard) {
        return companyLeaderboardService.createCompanyLeaderboard(companyLeaderboard);
    }

    @PutMapping("/{companyId}")
    public ResponseEntity<CompanyLeaderboard> updateCompanyLeaderboard(@PathVariable Long companyId, @RequestBody CompanyLeaderboard companyLeaderboard) {
        CompanyLeaderboard updatedLeaderboard = companyLeaderboardService.updateCompanyLeaderboard(companyId, companyLeaderboard);
        return ResponseEntity.ok(updatedLeaderboard);
    }

    @DeleteMapping("/{companyId}")
    public ResponseEntity<Void> deleteCompanyLeaderboard(@PathVariable Long companyId) {
        companyLeaderboardService.deleteCompanyLeaderboard(companyId);
        return ResponseEntity.noContent().build();
    }
}
