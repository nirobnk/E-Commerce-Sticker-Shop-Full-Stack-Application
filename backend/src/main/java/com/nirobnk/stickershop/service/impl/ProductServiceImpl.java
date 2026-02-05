package com.nirobnk.stickershop.service.impl;

import com.nirobnk.stickershop.dto.ProductDto;
import com.nirobnk.stickershop.entity.Product;
import com.nirobnk.stickershop.repository.ProductRepository;
import com.nirobnk.stickershop.service.IProductService;
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
        //throw new RuntimeException("dimuthu something went wrong");
        return productDto;
    }
}
