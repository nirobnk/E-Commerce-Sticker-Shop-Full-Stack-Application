package com.nirobnk.stickershop.service;

import com.nirobnk.stickershop.dto.ProductDto;

import java.util.List;

public interface IProductService {

    List<ProductDto> getProducts();
}
