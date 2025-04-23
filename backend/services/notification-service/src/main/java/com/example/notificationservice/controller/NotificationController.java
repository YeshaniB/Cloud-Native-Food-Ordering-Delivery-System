package com.example.notificationservice.controller;

import com.example.notificationservice.model.Notification;
import com.example.notificationservice.repository.NotificationRepository;
import com.example.notificationservice.service.EmailService;
import com.example.notificationservice.service.SmsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;


@RestController
@RequestMapping("/api/notify")
public class NotificationController {

    @Autowired
    private SmsService smsService;

    @Autowired
    private NotificationRepository repo;

    @Autowired
    private EmailService emailService;

    @PostMapping("/order-confirmation")
    public ResponseEntity<?> sendOrderNotification(@RequestBody Notification noti) {
        smsService.sendSms(noti.getToPhone(), noti.getMessage());
        emailService.sendEmail("customer@example.com", "Order Confirmation", noti.getMessage());
        noti.setTimestamp(LocalDateTime.now());
        repo.save(noti);
        return ResponseEntity.ok("Order notification sent via SMS and Email!");
    }

    @PostMapping("/delivery-update")
    public ResponseEntity<?> sendDeliveryNotification(@RequestBody Notification noti) {
        smsService.sendSms(noti.getToPhone(), noti.getMessage());
        emailService.sendEmail("delivery@example.com", "Delivery Assignment", noti.getMessage());
        noti.setTimestamp(LocalDateTime.now());
        repo.save(noti);
        return ResponseEntity.ok("Delivery update sent via SMS and Email!");
    }


}
