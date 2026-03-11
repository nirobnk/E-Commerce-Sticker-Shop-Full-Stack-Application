package com.nirobnk.stickershop.dto;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class ProductRequestDto {

    @NotBlank(message = "Product name is required")
    @Size(min = 2, max = 100, message = "Product name must be between 2 and 100 characters")
    private String name;

    @NotBlank(message = "Product description is required")
    @Size(min = 10, max = 500, message = "Product description must be between 10 and 500 characters")
    private String description;

    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.01", message = "Price must be greater than 0")
    @DecimalMax(value = "10000.00", message = "Price must be less than 10000")
    private BigDecimal price;

    @NotNull(message = "Popularity is required")
    @Min(value = 0, message = "Popularity must be at least 0")
    @Max(value = 100, message = "Popularity must be at most 100")
    private Integer popularity;

    @Size(max = 255, message = "Image URL must be less than 255 characters")
    private String imageUrl;
}
