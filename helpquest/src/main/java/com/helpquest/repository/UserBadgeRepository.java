package com.helpquest.repository;

import com.helpquest.entity.UserBadge;
import com.helpquest.entity.UserBadgePK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserBadgeRepository extends JpaRepository<UserBadge, UserBadgePK> {
    // Custom queries if needed
}

