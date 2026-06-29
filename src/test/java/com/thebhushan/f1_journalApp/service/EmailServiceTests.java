package com.thebhushan.f1_journalApp.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class EmailServiceTests {

    @Autowired
    private EmailService emailService;

//    @Disabled
    @Test
    void testSendMail() {
        emailService.sendEmail("bhushangadekar752@gmail.com",
                "Testing Java mail sender",
                "Hi, aap kaise hain ?");
    }
}