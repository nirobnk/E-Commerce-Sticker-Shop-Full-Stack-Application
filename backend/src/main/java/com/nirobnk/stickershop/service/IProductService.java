package com.nirobnk.stickershop.service;

import com.nirobnk.stickershop.dto.ProductDto;
import com.nirobnk.stickershop.dto.ProductRequestDto;

import java.util.List;

public interface IProductService {

    List<ProductDto> getProducts();
    
    ProductDto createProduct(ProductRequestDto productRequestDto, String username);
    
    ProductDto updateProduct(Long productId, ProductRequestDto productRequestDto, String username);
    
    void deleteProduct(Long productId);
    
    ProductDto getProductById(Long productId);
}
