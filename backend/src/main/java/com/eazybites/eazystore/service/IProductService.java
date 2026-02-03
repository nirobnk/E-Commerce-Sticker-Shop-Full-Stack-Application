package com.eazybites.eazystore.service;

import com.eazybites.eazystore.dto.ProductDto;
import com.eazybites.eazystore.entity.Product;

import java.util.List;

public interface IProductService {

    List<ProductDto> getProducts();
}
