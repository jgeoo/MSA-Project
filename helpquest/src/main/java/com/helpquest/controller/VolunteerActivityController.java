package com.helpquest.controller;

import com.helpquest.entity.VolunteerActivity;
import com.helpquest.service.VolunteerActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/volunteeractivities")
public class VolunteerActivityController {

    private final VolunteerActivityService volunteerActivityService;

    public VolunteerActivityController(VolunteerActivityService volunteerActivityService) {
        this.volunteerActivityService = volunteerActivityService;
    }

    @GetMapping
    public List<VolunteerActivity> getAllVolunteerActivities() {
        return volunteerActivityService.getAllVolunteerActivities();
    }

    @GetMapping("/{id}")
    public ResponseEntity<VolunteerActivity> getVolunteerActivityById(@PathVariable Long id) {
        return volunteerActivityService.getVolunteerActivityById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public VolunteerActivity createVolunteerActivity(@RequestBody VolunteerActivity activity) {
        return volunteerActivityService.createVolunteerActivity(activity);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVolunteerActivity(@PathVariable Long id) {
        volunteerActivityService.deleteVolunteerActivity(id);
        return ResponseEntity.noContent().build();
    }
}
