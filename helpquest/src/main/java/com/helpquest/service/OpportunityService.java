package com.helpquest.service;



import com.helpquest.entity.Opportunity;
import com.helpquest.repository.OpportunityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OpportunityService {

    @Autowired
    private OpportunityRepository opportunityRepository;

    // Retrieve all opportunities
    public List<Opportunity> getAllOpportunities() {
        return opportunityRepository.findAll();
    }

    // Retrieve an opportunity by ID
    public Optional<Opportunity> getOpportunityById(Long id) {
        return opportunityRepository.findById(id);
    }

    // Add a new opportunity
    public Opportunity createOpportunity(Opportunity opportunity) {
        return opportunityRepository.save(opportunity);
    }

    // Update an existing opportunity
    public Optional<Opportunity> updateOpportunity(Long id, Opportunity updatedOpportunity) {
        return opportunityRepository.findById(id).map(opportunity -> {
            opportunity.setTitle(updatedOpportunity.getTitle());
            opportunity.setDescription(updatedOpportunity.getDescription());
            opportunity.setLocation(updatedOpportunity.getLocation());
            opportunity.setStartDate(updatedOpportunity.getStartDate());
            opportunity.setEndDate(updatedOpportunity.getEndDate());
            opportunity.setDonationGoal(updatedOpportunity.getDonationGoal());
            return opportunityRepository.save(opportunity);
        });
    }

    // Delete an opportunity by ID
    public void deleteOpportunity(Long id) {
        opportunityRepository.deleteById(id);
    }
}

