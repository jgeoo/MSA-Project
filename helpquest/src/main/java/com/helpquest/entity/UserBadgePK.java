package com.helpquest.entity;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
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
