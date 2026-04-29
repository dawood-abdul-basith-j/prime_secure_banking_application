package com.primesecure.bank.service;

import com.primesecure.bank.dto.TransferRequest;
import com.primesecure.bank.model.Account;
import com.primesecure.bank.model.Transaction;
import com.primesecure.bank.model.TransactionStatus;
import com.primesecure.bank.model.TransactionType;
import com.primesecure.bank.model.User;
import com.primesecure.bank.repository.AccountRepository;
import com.primesecure.bank.repository.TransactionRepository;
import com.primesecure.bank.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public Transaction processTransfer(String senderEmail, TransferRequest request) {
        
        // 1. Get Sender
        User sender = userRepository.findByEmail(senderEmail)
                .orElseThrow(() -> new RuntimeException("Sender not found"));
        
        // 2. Verify PIN
        if (!passwordEncoder.matches(request.getPin(), sender.getTransactionPin())) {
            throw new RuntimeException("Invalid Transaction PIN");
        }

        // 3. Get Recipient (by email or phone)
        User recipient = userRepository.findByEmail(request.getIdentifier())
                .orElseGet(() -> userRepository.findByPhoneNumber(request.getIdentifier())
                        .orElseThrow(() -> new RuntimeException("Recipient not found with identifier: " + request.getIdentifier())));

        if (sender.getId().equals(recipient.getId())) {
            throw new RuntimeException("Cannot transfer money to yourself");
        }

        // 4. Get Accounts
        Account senderAccount = accountRepository.findByUserId(sender.getId()).get(0);
        Account recipientAccount = accountRepository.findByUserId(recipient.getId()).get(0);

        // 5. Check Balance
        if (senderAccount.getBalance().compareTo(request.getAmount()) < 0) {
            throw new RuntimeException("Insufficient funds");
        }

        // 6. Execute Transfer
        senderAccount.setBalance(senderAccount.getBalance().subtract(request.getAmount()));
        recipientAccount.setBalance(recipientAccount.getBalance().add(request.getAmount()));

        accountRepository.save(senderAccount);
        accountRepository.save(recipientAccount);

        // 7. Record Transaction
        Transaction transaction = Transaction.builder()
                .fromUser(sender)
                .toUser(recipient)
                .amount(request.getAmount())
                .type(TransactionType.P2P_TRANSFER)
                .category(request.getCategory() != null ? request.getCategory() : "Transfer")
                .status(TransactionStatus.COMPLETED)
                .build();

        return transactionRepository.save(transaction);
    }

    public List<Transaction> getUserTransactions(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return transactionRepository.findAllByUserId(user.getId());
    }
}
