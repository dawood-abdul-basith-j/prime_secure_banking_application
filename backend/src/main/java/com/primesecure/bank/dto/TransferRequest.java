package com.primesecure.bank.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class TransferRequest {
    @NotBlank
    private String identifier; // Can be email or phone number

    @NotNull
    @DecimalMin(value = "1.0", message = "Amount must be greater than 0")
    private BigDecimal amount;

    private String category; // e.g., "Food", "Rent"
    
    @NotBlank
    private String pin; // Transaction PIN for verification
}
