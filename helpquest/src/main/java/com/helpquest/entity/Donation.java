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
    @JoinColumn(name = "user_id", nullable = true)
    @JsonBackReference(value = "donations-user")
    private User user;

    @ManyToOne
    @JoinColumn(name = "opportunity_id", nullable = true)
    @JsonBackReference(value = "donations-opportunity")
    private Opportunity opportunity;

    private Long amount;

    @Column(name = "donated_at", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime donatedAt = LocalDateTime.now();
}
