package com.nirobnk.stickershop.repository;

import com.nirobnk.stickershop.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository //optional
public interface ProductRepository extends JpaRepository<Product,Long> {
}
