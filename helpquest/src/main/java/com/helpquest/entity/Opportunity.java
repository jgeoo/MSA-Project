package com.helpquest.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "opportunities")
@Getter
@Setter
public class Opportunity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long opportunityId;

    @ManyToOne
    @JoinColumn(name = "ngoId")
    @JsonBackReference(value = "ngo-opportunities")
    private NGO ngo;

    private String title;

    private String description;

    private String location;

    private Date startDate;

    private Date endDate;

    private Double donationGoal;

    @OneToMany(mappedBy = "opportunity", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference(value = "opportunity-donations")
    private Set<Donation> donations;

    private Timestamp createdAt;
}
