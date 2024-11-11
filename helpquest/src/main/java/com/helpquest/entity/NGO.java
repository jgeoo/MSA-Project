package com.helpquest.entity;

import jakarta.persistence.*;

import java.sql.Timestamp;
import java.util.List;
@Entity
@Table(name = "ngos")
public class NGO {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ngoId;

    private String name;
    private String description;
    private String contactEmail;
    private Timestamp createdAt;

    /*
    @OneToMany(mappedBy = "ngo")
    private List<Opportunity> opportunities;
    */
    // Getters and Setters

    public void setNgoId(Long ngoId) {
        this.ngoId = ngoId;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public void setContactEmail(String contactEmail) {
        this.contactEmail = contactEmail;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public Long getNgoId() {
        return ngoId;
    }

    public String getDescription() {
        return description;
    }

    public String getContactEmail() {
        return contactEmail;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }
}
