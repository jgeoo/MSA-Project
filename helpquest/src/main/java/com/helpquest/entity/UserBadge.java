package com.helpquest.entity;


import jakarta.persistence.*;

@Entity
@IdClass(UserBadgePK.class)
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

    // Getters and Setters
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Badge getBadge() {
        return badge;
    }

    public void setBadge(Badge badge) {
        this.badge = badge;
    }

    public java.sql.Timestamp getAwardedAt() {
        return awardedAt;
    }

    public void setAwardedAt(java.sql.Timestamp awardedAt) {
        this.awardedAt = awardedAt;
    }
}
