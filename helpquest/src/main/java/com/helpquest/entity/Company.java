package com.helpquest.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.List;

@Entity
@Table(name = "companies")
@Getter
@Setter
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long companyId;

    private String name;

    private String description;

    private int totalPoints;

    private Timestamp createdAt;

    @OneToMany(mappedBy = "company")
    private List<User> users;
}
