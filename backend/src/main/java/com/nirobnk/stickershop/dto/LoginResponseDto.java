package com.nirobnk.stickershop.dto;

public record LoginResponseDto(String message, UserDto user, String jwtToken) {
}
