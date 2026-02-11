package com.nirobnk.stickershop.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ProfileResponseDto {
    private Long customerId;
    private String name;
    private String email;
    private String mobileNumber;
    private AddressDto address;
    private boolean emailUpdated;
}