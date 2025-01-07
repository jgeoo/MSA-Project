package com.helpquest.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.Date;

@Entity
@Table(name = "opportunities")
@Getter
@Setter
public class Opportunity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long opportunityId;

    @ManyToOne
    @JoinColumn(name = "ngoid")
    private NGO ngo;

    private String title;

    private String description;

    private String location;

    private Date startDate;

    private Date endDate;

    private Double donationGoal;

    private Timestamp createdAt;
}
