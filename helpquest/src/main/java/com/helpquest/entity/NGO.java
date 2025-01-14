package com.helpquest.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "ngos")
@Getter
@Setter
public class NGO {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ngoId;

    private String name;


//    private String contactEmail;

    private Double longitude;

    private Double latitude;

    private String adress;

    @OneToMany(mappedBy = "ngo", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference(value = "ngo-opportunities")
    private Set<Opportunity> opportunities;

}
