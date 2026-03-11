package com.nirobnk.stickershop.controller;

import com.nirobnk.stickershop.constants.ApplicationConstants;
import com.nirobnk.stickershop.dto.ContactResponseDto;
import com.nirobnk.stickershop.dto.OrderResponseDto;
import com.nirobnk.stickershop.dto.ProductDto;
import com.nirobnk.stickershop.dto.ProductRequestDto;
import com.nirobnk.stickershop.dto.ResponseDto;
import com.nirobnk.stickershop.entity.Order;
import com.nirobnk.stickershop.service.IContactService;
import com.nirobnk.stickershop.service.IOrderService;
import com.nirobnk.stickershop.service.IProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
public class AdminController {

    private final IOrderService iOrderService;
    private final IContactService iContactService;
    private final IProductService iProductService;

    @GetMapping("/orders")
    public ResponseEntity<List<OrderResponseDto>> getAllPendingOrders() {
        return ResponseEntity.ok().body(iOrderService.getAllPendingOrders());
    }

    @PatchMapping("/orders/{orderId}/confirm")
    public ResponseEntity<ResponseDto> confirmOrder(@PathVariable Long orderId) {
        Order confirmedOrder = iOrderService.updateOrderStatus(orderId, ApplicationConstants.ORDER_STATUS_CONFIRMED);
        return ResponseEntity.ok(
                new ResponseDto("200", "Order #" + confirmedOrder.getOrderId() + " has been approved.")
        );
    }

    @PatchMapping("/orders/{orderId}/cancel")
    public ResponseEntity<ResponseDto> cancelOrder(@PathVariable Long orderId) {
        Order cancelledOrder = iOrderService.updateOrderStatus(orderId, ApplicationConstants.ORDER_STATUS_CANCELLED);
        return ResponseEntity.ok(
                new ResponseDto("200", "Order #" + cancelledOrder.getOrderId() + " has been cancelled.")
        );
    }

    @GetMapping("/messages")
    public ResponseEntity<List<ContactResponseDto>> getAllOpenMessages() {
        return ResponseEntity.ok(iContactService.getAllOpenMessages());
    }

    @PatchMapping("/messages/{contactId}/close")
    public ResponseEntity<ResponseDto> closeMessage(@PathVariable Long contactId) {
        iContactService.updateMessageStatus(contactId, ApplicationConstants.CLOSED_MESSAGE);
        return ResponseEntity.ok(
                new ResponseDto("200", "Contact #" + contactId + " has been closed.")
        );
    }

    // ============= Product Management Endpoints =============

    @GetMapping("/products")
    public ResponseEntity<List<ProductDto>> getAllProducts() {
        return ResponseEntity.ok(iProductService.getProducts());
    }

    @GetMapping("/products/{productId}")
    public ResponseEntity<ProductDto> getProductById(@PathVariable Long productId) {
        return ResponseEntity.ok(iProductService.getProductById(productId));
    }

    @PostMapping("/products")
    public ResponseEntity<ProductDto> createProduct(
            @Valid @RequestBody ProductRequestDto productRequestDto,
            Authentication authentication) {
        String username = authentication.getName();
        ProductDto createdProduct = iProductService.createProduct(productRequestDto, username);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdProduct);
    }

    @PutMapping("/products/{productId}")
    public ResponseEntity<ProductDto> updateProduct(
            @PathVariable Long productId,
            @Valid @RequestBody ProductRequestDto productRequestDto,
            Authentication authentication) {
        String username = authentication.getName();
        ProductDto updatedProduct = iProductService.updateProduct(productId, productRequestDto, username);
        return ResponseEntity.ok(updatedProduct);
    }

    @DeleteMapping("/products/{productId}")
    public ResponseEntity<ResponseDto> deleteProduct(@PathVariable Long productId) {
        iProductService.deleteProduct(productId);
        return ResponseEntity.ok(
                new ResponseDto("200", "Product #" + productId + " has been deleted successfully.")
        );
    }

}