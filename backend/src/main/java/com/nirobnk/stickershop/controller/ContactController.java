package com.nirobnk.stickershop.controller;


import com.nirobnk.stickershop.dto.ContactRequestDto;
import com.nirobnk.stickershop.dto.ProductDto;
import com.nirobnk.stickershop.service.IContactService;
import com.nirobnk.stickershop.service.IProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/contacts")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ContactController {


    private final IContactService iContactService;

    @PostMapping
    public ResponseEntity<String> saveContact(@Valid @RequestBody ContactRequestDto contactRequestDto){
        iContactService.saveContact(contactRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body("Request processed successfully");
    }
}
