package com.primesecure.bank.config;

import com.primesecure.bank.model.Account;
import com.primesecure.bank.model.Role;
import com.primesecure.bank.model.User;
import com.primesecure.bank.repository.AccountRepository;
import com.primesecure.bank.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Create a default user if none exists
        if (userRepository.count() == 0) {
            User defaultUser = User.builder()
                    .fullName("John Doe")
                    .email("user@primebank.com")
                    .phoneNumber("9876543210")
                    .password(passwordEncoder.encode("Pass1234"))
                    .transactionPin(passwordEncoder.encode("123456"))
                    .role(Role.USER)
                    .build();

            User savedUser = userRepository.save(defaultUser);

            // Give them an initial balance
            Account mainAccount = Account.builder()
                    .accountNumber("1020304050")
                    .balance(new BigDecimal("15250.00"))
                    .user(savedUser)
                    .build();

            accountRepository.save(mainAccount);

            System.out.println("--------------------------------------------------");
            System.out.println("DEFAULT LOGIN CREATED FOR TESTING:");
            System.out.println("Email: user@primebank.com");
            System.out.println("Password: Pass1234");
            System.out.println("Transaction PIN: 123456");
            System.out.println("--------------------------------------------------");
        }
    }
}
