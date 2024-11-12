package com.helpquest.entity;

import java.io.Serializable;
import java.util.Objects;

public class UserBadgePK implements Serializable {

    private Long user;
    private Long badge;

    // Default constructor
    public UserBadgePK() {
    }

    public UserBadgePK(Long user, Long badge) {
        this.user = user;
        this.badge = badge;
    }

    public Long getUser() {
        return user;
    }

    public void setUser(Long user) {
        this.user = user;
    }

    public Long getBadge() {
        return badge;
    }

    public void setBadge(Long badge) {
        this.badge = badge;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserBadgePK that = (UserBadgePK) o;
        return Objects.equals(user, that.user) && Objects.equals(badge, that.badge);
    }

    @Override
    public int hashCode() {
        return Objects.hash(user, badge);
    }
}
