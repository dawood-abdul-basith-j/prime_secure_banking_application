package com.primesecure.bank.controller;

import com.primesecure.bank.dto.TransferRequest;
import com.primesecure.bank.model.Transaction;
import com.primesecure.bank.service.TransactionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @PostMapping("/transfer")
    public ResponseEntity<?> processTransfer(@Valid @RequestBody TransferRequest transferRequest, Authentication authentication) {
        try {
            String senderEmail = authentication.getName();
            Transaction transaction = transactionService.processTransfer(senderEmail, transferRequest);
            return ResponseEntity.ok(transaction);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/me")
    public ResponseEntity<List<Transaction>> getMyTransactions(Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(transactionService.getUserTransactions(email));
    }
}
