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
@CrossOrigin(origins = "*") // Allow React to access
public class PaymentController {

    @Value("${stripe.secret.key}")
    private String stripeSecretKey;



    @Autowired
    private PaymentRecordRepository paymentRecordRepository;

    @PostMapping("/create-payment-intent")
    public Map<String, Object> createPaymentIntent(@RequestBody Map<String, Object> request) throws Exception {
        Stripe.apiKey = stripeSecretKey;

        int amount = (int) request.get("amount");
        String orderId = (String) request.get("orderId"); // Frontend should send orderId now

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
        record.setStatus("SUCCESSFUL");
        record.setOrderId(orderId);
        record.setCreatedAt(new Date());
        paymentRecordRepository.save(record);

        Map<String, Object> responseData = new HashMap<>();
        responseData.put("clientSecret", intent.getClientSecret());
        return responseData;
    }

    @PostMapping("/webhook")
    public ResponseEntity<String> handleStripeWebhook(@RequestBody String payload, @RequestHeader("Stripe-Signature") String sigHeader) {
        String endpointSecret = "whsec_6bd1b4504dabecfac2c671a7631ffbfcfc8dad2833bac4aac0f33e5df610ee71"; // We'll generate this from Stripe dashboard
        Event event = null;

        try {
            event = Webhook.constructEvent(payload, sigHeader, endpointSecret);

            if ("payment_intent.succeeded".equals(event.getType())) {
                PaymentIntent intent = (PaymentIntent) event.getDataObjectDeserializer().getObject().orElse(null);
                if (intent != null) {
                    // Update PaymentRecord status
                    PaymentRecord record = paymentRecordRepository.findByPaymentIntentId(intent.getId());
                    if (record != null) {
                        record.setStatus("SUCCEEDED");
                        paymentRecordRepository.save(record);
                    }
                }
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok("");
    }


}
