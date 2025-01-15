package com.helpquest.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Donation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long donationId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference(value = "user-donations")
    private User user;

    @ManyToOne
    @JoinColumn(name = "opportunityId")
    @JsonBackReference(value = "opportunity-donations")
    private Opportunity opportunity;

    private Long amount;

    @Column(name = "donated_at", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime donatedAt = LocalDateTime.now();
}
