//package com.thebhushan.f1_journalApp.service;
//
//import com.thebhushan.f1_journalApp.model.SentimentData;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.kafka.annotation.KafkaListener;
//
//import org.springframework.stereotype.Service;
//
//@Service
//public class SentimentConsumerService {
//
//    @Autowired
//    private EmailService emailService;
//
//    @KafkaListener(topics = "weekly-sentiments", groupId = "weekly-sentiment-group")
//    public void consume(SentimentData sentimentData) {
//        sendEmail(sentimentData);
//    }
//
//    private void sendEmail(SentimentData sentimentData) {
//        emailService.sendEmail(sentimentData.getEmail(), "Sentiment for previous week", sentimentData.getSentiment());
//    }
//}


package com.thebhushan.f1_journalApp.service;

import com.thebhushan.f1_journalApp.model.SentimentData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class SentimentConsumerService {

    @Autowired
    private EmailService emailService;

    @KafkaListener(
            topics = "weekly-sentiments",
            groupId = "weekly-sentiment-group"
    )
    public void consume(SentimentData sentimentData) {

        System.out.println("========== KAFKA MESSAGE RECEIVED ==========");
        System.out.println("Email      : " + sentimentData.getEmail());
        System.out.println("Sentiment  : " + sentimentData.getSentiment());

        sendEmail(sentimentData);
    }

    private void sendEmail(SentimentData sentimentData) {

        emailService.sendEmail(
                sentimentData.getEmail(),
                "Sentiment for previous week",
                sentimentData.getSentiment()
        );

        System.out.println(" Email Sent Successfully");
    }
}


