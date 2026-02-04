package com.nirobnk.stickershop.service;

import com.nirobnk.stickershop.dto.ContactRequestDto;

public interface IContactService {
    boolean saveContact(ContactRequestDto contactRequestDto);
}
