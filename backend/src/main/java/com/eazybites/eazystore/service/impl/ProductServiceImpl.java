package com.eazybites.eazystore.service.impl;

import com.eazybites.eazystore.controller.ProductController;
import com.eazybites.eazystore.dto.ProductDto;
import com.eazybites.eazystore.entity.Product;
import com.eazybites.eazystore.repository.ProductRepository;
import com.eazybites.eazystore.service.IProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements IProductService {


    private final ProductRepository productRepository;


    @Override
    public List<ProductDto> getProducts() {
        return productRepository.findAll()
                .stream().map(this::transformToDTO).collect(Collectors.toList());
    }

    private ProductDto transformToDTO (Product product){
        ProductDto productDto = new ProductDto();
        BeanUtils.copyProperties(product, productDto);
        return productDto;
    }
}
