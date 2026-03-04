package com.nirobnk.stickershop.service;

import com.nirobnk.stickershop.dto.ContactRequestDto;
import com.nirobnk.stickershop.dto.ContactResponseDto;

import java.util.List;

public interface IContactService {
    boolean saveContact(ContactRequestDto contactRequestDto);

    List<ContactResponseDto> getAllOpenMessages();

    void updateMessageStatus(Long contactId, String status);
}
