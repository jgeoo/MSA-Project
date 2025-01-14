package com.helpquest.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.Collection;

@Entity
@Table(name = "users")
@Setter
@Getter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    private String name;

    private String email;

    private String passwordHash;

    @Enumerated(EnumType.STRING)
    private RoleEnum role;

    private String phoneNumber;

    @ManyToOne
    @JoinColumn(name = "company_id")
    private Company company;

    private Timestamp createdAt;
}
