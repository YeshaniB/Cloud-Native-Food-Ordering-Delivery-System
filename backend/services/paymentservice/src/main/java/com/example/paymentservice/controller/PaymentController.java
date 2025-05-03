package com.example.paymentservice.controller;

import com.example.paymentservice.model.PaymentRecord;
import com.example.paymentservice.repository.PaymentRecordRepository;
import com.stripe.Stripe;
import com.stripe.model.Event;
import com.stripe.model.PaymentIntent;
import com.stripe.net.Webhook;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Date;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentController {

    @Value("${stripe.secret.key}")
    private String stripeSecretKey;

    @Autowired
    private PaymentRecordRepository paymentRecordRepository;

    @PostMapping("/create-payment-intent")
    public Map<String, Object> createPaymentIntent(@RequestBody Map<String, Object> request) throws Exception {
        Stripe.apiKey = stripeSecretKey;

        // ✅ Safe number parsing
        Object amountObj = request.get("amount");
        int amount = (amountObj instanceof Number)
                ? ((Number) amountObj).intValue()
                : Integer.parseInt(amountObj.toString());

        String orderId = (String) request.get("orderId");

        System.out.println("Creating payment intent for amount: " + amount + ", orderId: " + orderId);

        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount((long) amount)
                .setCurrency("usd")
                .build();

        PaymentIntent intent = PaymentIntent.create(params);

        // Save PaymentRecord
        PaymentRecord record = new PaymentRecord();
        record.setPaymentIntentId(intent.getId());
        record.setAmount((long) amount);
        record.setCurrency("usd");
        record.setStatus("CREATED");
        record.setOrderId(orderId);
        record.setCreatedAt(new Date());
        paymentRecordRepository.save(record);

        Map<String, Object> responseData = new HashMap<>();
        responseData.put("clientSecret", intent.getClientSecret());

        return responseData;
    }

    @PostMapping("/webhook")
    public ResponseEntity<String> handleStripeWebhook(@RequestBody String payload, @RequestHeader("Stripe-Signature") String sigHeader) {
        String endpointSecret = "whsec_6bd1b4504dabecfac2c671a7631ffbfcfc8dad2833bac4aac0f33e5df610ee71";

        try {
            Event event = Webhook.constructEvent(payload, sigHeader, endpointSecret);

            if ("payment_intent.succeeded".equals(event.getType())) {
                PaymentIntent intent = (PaymentIntent) event.getDataObjectDeserializer().getObject().orElse(null);
                if (intent != null) {
                    PaymentRecord record = paymentRecordRepository.findByPaymentIntentId(intent.getId());
                    if (record != null) {
                        record.setStatus("SUCCEEDED");
                        paymentRecordRepository.save(record);
                    }
                }
            }
        } catch (Exception e) {
            System.err.println("⚠️ Webhook error: " + e.getMessage());
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok("");
    }
}
