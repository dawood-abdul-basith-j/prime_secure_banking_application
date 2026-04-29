package com.primesecure.bank.repository;

import com.primesecure.bank.model.SplitRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SplitRequestRepository extends JpaRepository<SplitRequest, Long> {
    List<SplitRequest> findByRequesterId(Long requesterId);
    List<SplitRequest> findByPayerId(Long payerId);
}
