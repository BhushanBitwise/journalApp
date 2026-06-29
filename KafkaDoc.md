# Spring Boot + Kafka 4.3.0 (KRaft Mode) Complete Documentation (Windows)

## Project

Journal App – Weekly Sentiment Email Processing

Flow:

Scheduler
↓
Kafka Producer
↓
Kafka Topic (weekly-sentiments)
↓
Kafka Consumer
↓
Email Service
↓
Gmail

---

# Kafka Installation

Downloaded:

```
kafka_2.13-4.3.0.tgz
```

Extracted to:

```
D:\kafka_2.13-4.3.0
```

---

# CMD-1 : Generate Cluster UUID

Open CMD:

```bat
cd /d D:\kafka_2.13-4.3.0
```

Generate UUID:

```bat
bin\windows\kafka-storage.bat random-uuid
```

Example Output:

```text
OjUi6LnHRlOJk79qAMDa8w
```

Save this UUID.

---

# CMD-1 : Format Kafka Storage

Run ONLY ONCE:

```bat
bin\windows\kafka-storage.bat format -t OjUi6LnHRlOJk79qAMDa8w -c config\server.properties --standalone
```

Expected Output:

```text
Formatting dynamic metadata voter directory...
```

If rerun:

```text
Log directory already formatted.
```

This is normal.

---

# CMD-1 : Start Kafka Server

Keep this CMD OPEN.

```bat
bin\windows\kafka-server-start.bat config\server.properties
```

Kafka Broker:

```
localhost:9092
```

Controller:

```
localhost:9093
```

If running successfully:

```text
BrokerServer id=1 Starting broker
```

DO NOT CLOSE THIS CMD.

---

# CMD-2 : Topic Operations

Open NEW CMD:

```bat
cd /d D:\kafka_2.13-4.3.0
```

Create Topic:

```bat
bin\windows\kafka-topics.bat --create --topic weekly-sentiments --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1
```

If topic exists:

```text
TopicExistsException
```

This means topic already exists.

---

List Topics:

```bat
bin\windows\kafka-topics.bat --list --bootstrap-server localhost:9092
```

Output:

```text
weekly-sentiments
```

---

Describe Topic:

```bat
bin\windows\kafka-topics.bat --describe --topic weekly-sentiments --bootstrap-server localhost:9092
```

Example:

```text
Topic: weekly-sentiments
PartitionCount:1
ReplicationFactor:1
Leader:1
```

---

# CMD-3 : Console Consumer

Open NEW CMD:

```bat
cd /d D:\kafka_2.13-4.3.0
```

Run:

```bat
bin\windows\kafka-console-consumer.bat --bootstrap-server localhost:9092 --topic weekly-sentiments --from-beginning
```

This CMD waits for messages.

Do NOT close.

---

# CMD-4 : Console Producer

Open NEW CMD:

```bat
cd /d D:\kafka_2.13-4.3.0
```

Run:

```bat
bin\windows\kafka-console-producer.bat --bootstrap-server localhost:9092 --topic weekly-sentiments
```

Type:

```text
Hello Bhushan
Kafka Testing
```

Consumer CMD should display:

```text
Hello Bhushan
Kafka Testing
```

---

# CMD-5 : Consumer Group Monitoring

Open NEW CMD:

```bat
cd /d D:\kafka_2.13-4.3.0
```

Run:

```bat
bin\windows\kafka-consumer-groups.bat --bootstrap-server localhost:9092 --describe --group weekly-sentiment-group
```

Example:

```text
GROUP                  TOPIC             PARTITION CURRENT-OFFSET LOG-END-OFFSET LAG
weekly-sentiment-group weekly-sentiments 0         5              5              0
```

Meaning:

CURRENT-OFFSET:
Consumer consumed messages.

LOG-END-OFFSET:
Total messages.

LAG:
Pending messages.

LAG = 0 means everything consumed.

---

# Spring Boot application.yml

Kafka Configuration:

```yaml
spring:
  kafka:
    bootstrap-servers: localhost:9092

    producer:
      key-serializer: org.apache.kafka.common.serialization.StringSerializer
      value-serializer: org.springframework.kafka.support.serializer.JsonSerializer

    consumer:
      group-id: weekly-sentiment-group
      auto-offset-reset: earliest

      key-deserializer: org.apache.kafka.common.serialization.StringDeserializer

      value-deserializer: org.springframework.kafka.support.serializer.JsonDeserializer

      properties:
        spring:
          json:
            trusted:
              packages: com.thebhushan.f1_journalApp.model
```

Remove:

```yaml
security:
protocol: SASL_SSL
sasl:
...
```

These are only for Confluent Cloud.

---

# Producer Code

```java
kafkaTemplate.send(
        "weekly-sentiments",
        sentimentData.getEmail(),
        sentimentData
);
```

---

# Consumer Code

```java
@KafkaListener(
        topics = "weekly-sentiments",
        groupId = "weekly-sentiment-group"
)
public void consume(SentimentData sentimentData) {

    System.out.println(sentimentData);

    sendEmail(sentimentData);
}
```

---

# Final Verified Flow

Scheduler
↓
KafkaTemplate.send()
↓
Kafka Topic
↓
Kafka Consumer
↓
Email Service
↓
Gmail Inbox

---

# Verification Done

Kafka Broker Running          ✓

Topic Created                 ✓

Producer Working              ✓

Consumer Working              ✓

Consumer Group Active         ✓

Lag Monitoring                ✓

Email Received                ✓

Spring Boot Integration       ✓

Kafka 4.3.0 KRaft Setup       ✓

---

# CMD Summary

CMD-1
Kafka Server

```bat
kafka-server-start.bat
```

CMD-2
Topic Management

```bat
kafka-topics.bat
```

CMD-3
Console Consumer

```bat
kafka-console-consumer.bat
```

CMD-4
Console Producer

```bat
kafka-console-producer.bat
```

CMD-5
Consumer Group Monitoring

```bat
kafka-consumer-groups.bat
```

---

# Resume Statement

Implemented Apache Kafka 4.3 (KRaft Mode) with Spring Boot using Producer-Consumer architecture for asynchronous sentiment-based email processing, monitored using Kafka Consumer Groups and Lag analysis.
