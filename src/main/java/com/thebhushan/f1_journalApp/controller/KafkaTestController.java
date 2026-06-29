package com.thebhushan.f1_journalApp.controller;
import com.thebhushan.f1_journalApp.model.SentimentData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class KafkaTestController {

    @Autowired
    private KafkaTemplate<String, SentimentData> kafkaTemplate;

    @GetMapping("/kafka-test")
    public String testKafka() {

        SentimentData data = SentimentData.builder()
                .email("bhushangadekar752@gmail.com")
                .sentiment("Happy")
                .build();

        kafkaTemplate.send(
                "weekly-sentiments",
                data.getEmail(),
                data
        );
        return "Kafka Message Sent";
    }
}