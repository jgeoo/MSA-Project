package com.helpquest.controller;

import com.helpquest.entity.Opportunity;
import com.helpquest.service.OpportunityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/opportunities")
public class OpportunityController {

    private final OpportunityService opportunityService;

    public OpportunityController(OpportunityService opportunityService) {
        this.opportunityService = opportunityService;
    }

    // GET all opportunities
    @GetMapping
    public List<Opportunity> getAllOpportunities() {
        return opportunityService.getAllOpportunities();
    }

    // GET an opportunity by ID
    @GetMapping("/{id}")
    public ResponseEntity<Opportunity> getOpportunityById(@PathVariable Long id) {
        Optional<Opportunity> opportunity = opportunityService.getOpportunityById(id);
        return opportunity.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // POST a new opportunity
    @PostMapping
    public ResponseEntity<Opportunity> createOpportunity(@RequestBody Opportunity opportunity) {
        Opportunity createdOpportunity = opportunityService.createOpportunity(opportunity);
        return new ResponseEntity<>(createdOpportunity, HttpStatus.CREATED);
    }

    // PUT (update) an opportunity by ID
    @PutMapping("/{id}")
    public ResponseEntity<Opportunity> updateOpportunity(@PathVariable Long id, @RequestBody Opportunity opportunity) {
        Optional<Opportunity> updatedOpportunity = opportunityService.updateOpportunity(id, opportunity);
        return updatedOpportunity.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // DELETE an opportunity by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOpportunity(@PathVariable Long id) {
        opportunityService.deleteOpportunity(id);
        return ResponseEntity.noContent().build();
    }
}
