package com.helpquest.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.List;
@Entity
@Table(name = "ngos")
@Getter
@Setter
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
}
