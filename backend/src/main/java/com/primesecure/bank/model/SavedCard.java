package com.primesecure.bank.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "saved_cards")
public class SavedCard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String cardNumberMasked; // e.g., "**** **** **** 1234"

    @Column(nullable = false)
    private String cardNetwork; // e.g., "VISA", "MASTERCARD"

    @Column(nullable = false)
    private String expiryDate; // e.g., "12/28"
}
