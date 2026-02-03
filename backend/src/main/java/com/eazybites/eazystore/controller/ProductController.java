package com.eazybites.eazystore.controller;


import com.eazybites.eazystore.dto.ProductDto;
import com.eazybites.eazystore.entity.Product;
import com.eazybites.eazystore.repository.ProductRepository;
import com.eazybites.eazystore.service.IProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.antlr.v4.runtime.tree.xpath.XPath.findAll;

@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {


    private final IProductService iProductService;



    @GetMapping
    public List<ProductDto> getProducts() {
        List<ProductDto> productList = iProductService.getProducts();
        return productList;
    }
}
