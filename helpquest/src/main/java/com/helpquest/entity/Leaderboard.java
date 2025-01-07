package com.helpquest.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Leaderboard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long leaderboardId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private int totalPoints;

    private int rank;

    @Column(name = "last_updated", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime lastUpdated = LocalDateTime.now();
}
