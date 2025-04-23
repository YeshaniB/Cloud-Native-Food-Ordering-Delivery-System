package com.example.notificationservice.service;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

@Component
public class SmsService {

    private final String ACCOUNT_SID = "ACc4a281e7aa8839b13e01c2d20d28f2df";
    private final String AUTH_TOKEN = "a6f9b1c5bc2ad5f3ef3c27b5c93af519";
    private final String FROM_PHONE = "+18154733819";

    @PostConstruct
    public void init() {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
    }

    public void sendSms(String to, String message) {
        Message.creator(
                new PhoneNumber(to),
                new PhoneNumber(FROM_PHONE), message).create();
    }
}

