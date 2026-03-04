package com.nirobnk.stickershop.service;

import com.nirobnk.stickershop.dto.PaymentIntentRequestDto;
import com.nirobnk.stickershop.dto.PaymentIntentResponseDto;

public interface IPaymentService {
    PaymentIntentResponseDto createPaymentIntent(PaymentIntentRequestDto requestDto);
}
