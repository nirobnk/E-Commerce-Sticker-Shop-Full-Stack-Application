package com.nirobnk.stickershop.service;

import com.nirobnk.stickershop.dto.ProfileRequestDto;
import com.nirobnk.stickershop.dto.ProfileResponseDto;

public interface IProfileService {
    ProfileResponseDto getProfile();

    ProfileResponseDto updateProfile(ProfileRequestDto profileRequestDto);
}
