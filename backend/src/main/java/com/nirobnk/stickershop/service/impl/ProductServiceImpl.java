package com.nirobnk.stickershop.service.impl;

import com.nirobnk.stickershop.dto.ProductDto;
import com.nirobnk.stickershop.dto.ProductRequestDto;
import com.nirobnk.stickershop.entity.Product;
import com.nirobnk.stickershop.exception.ResourceNotFoundException;
import com.nirobnk.stickershop.repository.ProductRepository;
import com.nirobnk.stickershop.service.IProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements IProductService {


    private final ProductRepository productRepository;


    @Cacheable("products")
    @Override
    public List<ProductDto> getProducts() {
        return productRepository.findAll()
                .stream().map(this::transformToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    @CacheEvict(value = "products", allEntries = true)
    public ProductDto createProduct(ProductRequestDto productRequestDto, String username) {
        Product product = new Product();
        product.setName(productRequestDto.getName());
        product.setDescription(productRequestDto.getDescription());
        product.setPrice(productRequestDto.getPrice());
        product.setPopularity(productRequestDto.getPopularity());
        product.setImageUrl(productRequestDto.getImageUrl());
        product.setCreatedAt(Instant.now());
        product.setCreatedBy(username);
        product.setUpdatedAt(Instant.now());
        product.setUpdatedBy(username);
        
        Product savedProduct = productRepository.save(product);
        return transformToDTO(savedProduct);
    }

    @Override
    @Transactional
    @CacheEvict(value = "products", allEntries = true)
    public ProductDto updateProduct(Long productId, ProductRequestDto productRequestDto, String username) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId.toString()));
        
        product.setName(productRequestDto.getName());
        product.setDescription(productRequestDto.getDescription());
        product.setPrice(productRequestDto.getPrice());
        product.setPopularity(productRequestDto.getPopularity());
        product.setImageUrl(productRequestDto.getImageUrl());
        product.setUpdatedAt(Instant.now());
        product.setUpdatedBy(username);
        
        Product updatedProduct = productRepository.save(product);
        return transformToDTO(updatedProduct);
    }

    @Override
    @Transactional
    @CacheEvict(value = "products", allEntries = true)
    public void deleteProduct(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId.toString()));
        
        productRepository.delete(product);
    }

    @Override
    public ProductDto getProductById(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId.toString()));
        
        return transformToDTO(product);
    }

    private ProductDto transformToDTO (Product product){
        ProductDto productDto = new ProductDto();
        BeanUtils.copyProperties(product, productDto);
        //throw new RuntimeException("dimuthu something went wrong");
        return productDto;
    }
}
