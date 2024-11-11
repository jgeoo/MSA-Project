package com.helpquest.entity;

import jakarta.persistence.*;

import java.sql.Timestamp;
import java.util.List;

@Entity
@Table(name = "companies")
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

    // Getters and Setters

    public void setCompanyId(Long companyId) {
        this.companyId = companyId;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setTotalPoints(int totalPoints) {
        this.totalPoints = totalPoints;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public Long getCompanyId() {
        return companyId;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public int getTotalPoints() {
        return totalPoints;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public List<User> getUsers() {
        return users;
    }
}
