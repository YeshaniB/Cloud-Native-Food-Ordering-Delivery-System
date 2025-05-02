

package com.example.paymentservice.repository;

import com.example.paymentservice.model.PaymentRecord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRecordRepository extends JpaRepository<PaymentRecord, Long> {
    PaymentRecord findByPaymentIntentId(String paymentIntentId);
}
