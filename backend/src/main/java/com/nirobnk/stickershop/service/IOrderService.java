package com.nirobnk.stickershop.service;

import com.nirobnk.stickershop.dto.OrderRequestDto;
import com.nirobnk.stickershop.dto.OrderResponseDto;
import com.nirobnk.stickershop.entity.Order;

import java.util.List;

public interface IOrderService {
    void createOrder(OrderRequestDto orderRequest);
    List<OrderResponseDto> getCustomerOrders();

    List<OrderResponseDto> getAllPendingOrders();

    Order updateOrderStatus(Long orderId, String orderStatus);
}
