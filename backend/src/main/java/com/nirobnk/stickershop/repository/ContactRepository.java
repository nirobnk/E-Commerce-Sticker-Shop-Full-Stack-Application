package com.nirobnk.stickershop.repository;


import com.nirobnk.stickershop.entity.Contact;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepository extends JpaRepository<Contact, Long> {
}