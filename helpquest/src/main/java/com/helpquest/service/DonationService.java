package com.helpquest.service;

import com.helpquest.entity.Donation;
import com.helpquest.entity.User;
import com.helpquest.repository.DonationRepository;
import com.helpquest.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DonationService {

    private final DonationRepository donationRepository;
    private final   UserService userService;
    public DonationService(DonationRepository donationRepository,UserService userService) {
        this.donationRepository = donationRepository;
        this.userService = userService;
    }

    public List<Donation> getAllDonations() {
        return donationRepository.findAll();
    }

    public Optional<Donation> getDonationById(Long id) {
        return donationRepository.findById(id);
    }

    public Donation createDonation(Donation donation) {
        User currentUser = donation.getUser();
        currentUser.setTotalPoints(currentUser.getTotalPoints()+(donation.getAmount()/10));
        userService.updateUser(donation.getUser().getUserId(),currentUser);
        return donationRepository.save(donation);
    }

    public void deleteDonation(Long id) {
        donationRepository.deleteById(id);
    }
}
