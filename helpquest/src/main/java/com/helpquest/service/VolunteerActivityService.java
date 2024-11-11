package com.helpquest.service;

import com.helpquest.entity.VolunteerActivity;
import com.helpquest.repository.VolunteerActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VolunteerActivityService {

    @Autowired
    private VolunteerActivityRepository volunteerActivityRepository;

    public List<VolunteerActivity> getAllVolunteerActivities() {
        return volunteerActivityRepository.findAll();
    }

    public Optional<VolunteerActivity> getVolunteerActivityById(Long id) {
        return volunteerActivityRepository.findById(id);
    }

    public VolunteerActivity createVolunteerActivity(VolunteerActivity activity) {
        return volunteerActivityRepository.save(activity);
    }

    public void deleteVolunteerActivity(Long id) {
        volunteerActivityRepository.deleteById(id);
    }
}
