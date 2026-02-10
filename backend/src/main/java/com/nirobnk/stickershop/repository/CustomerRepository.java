package com.nirobnk.stickershop.repository;


import com.nirobnk.stickershop.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    Optional<Customer> findByEmailOrMobileNumber(String email,String mobileNumber);
    Optional<Customer> findByEmail(String email);

}