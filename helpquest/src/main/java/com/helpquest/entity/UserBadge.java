package com.helpquest.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@IdClass(UserBadgePK.class)
@Getter
@Setter
public class UserBadge {

    @Id
    @ManyToOne
    @JoinColumn(name = "user_id") // Ensure the logical column name matches
    private User user;

    @Id
    @ManyToOne
    @JoinColumn(name = "badge_id") // Ensure the logical column name matches
    private Badge badge;

    @Column(name = "awarded_at") // Ensure the logical column name matches the DB column
    private java.sql.Timestamp awardedAt;
}
