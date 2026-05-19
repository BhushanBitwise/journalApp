package com.thebhushan.f1_journalApp.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;


@Document(collection = "journal_entries")
@Data  // this  Annotation Lambook se  hai
@NoArgsConstructor///
public class JournalEntry {
        @Id
        private ObjectId id;
        @NonNull
        private String title;
        private String content;
        private LocalDateTime date;


}


