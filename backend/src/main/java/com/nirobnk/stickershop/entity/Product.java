package com.nirobnk.stickershop.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id", nullable = false)
    private Long productId;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "price",nullable = false)
    private BigDecimal price;

    @Column(name = "popularity",nullable = false)
    private Integer popularity;

    @Column(name = "imageUrl")
    private String imageUrl;

    @Column(name = "createdAt",nullable = false)
    private Instant createdAt;

    @Column(name = "createdBy",nullable = false)
    private String createdBy;

    @Column(name = "updatedAt",nullable = false)
    private Instant updatedAt;

    @Column(name = "updatedBy",nullable = false)
    private String updatedBy;

}
