package com.primesecure.bank.service;

import com.primesecure.bank.dto.JwtResponse;
import com.primesecure.bank.dto.LoginRequest;
import com.primesecure.bank.dto.RegisterRequest;
import com.primesecure.bank.model.Account;
import com.primesecure.bank.model.Role;
import com.primesecure.bank.model.User;
import com.primesecure.bank.repository.AccountRepository;
import com.primesecure.bank.repository.UserRepository;
import com.primesecure.bank.security.JwtUtil;
import com.primesecure.bank.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Random;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Transactional
    public String registerUser(RegisterRequest signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new RuntimeException("Error: Email is already in use!");
        }

        if (userRepository.existsByPhoneNumber(signUpRequest.getPhoneNumber())) {
            throw new RuntimeException("Error: Phone number is already in use!");
        }

        // Create new user's account
        User user = User.builder()
                .fullName(signUpRequest.getFullName())
                .email(signUpRequest.getEmail())
                .phoneNumber(signUpRequest.getPhoneNumber())
                .password(encoder.encode(signUpRequest.getPassword()))
                .transactionPin(encoder.encode(signUpRequest.getTransactionPin()))
                .role(Role.USER)
                .build();

        User savedUser = userRepository.save(user);

        // Automatically create a main wallet account for the user
        Account account = Account.builder()
                .accountNumber(generateAccountNumber())
                .balance(new BigDecimal("1000.00")) // Give 1000 initial balance for demo
                .user(savedUser)
                .build();

        accountRepository.save(account);

        return "User registered successfully!";
    }

    public JwtResponse authenticateUser(LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtil.generateJwtToken(authentication);
        
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        return new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getFullName(),
                userDetails.getEmail(),
                userDetails.getAuthorities().iterator().next().getAuthority());
    }

    private String generateAccountNumber() {
        Random rnd = new Random();
        long number = (long) (rnd.nextDouble() * 9000000000L) + 1000000000L;
        return String.valueOf(number);
    }
}
