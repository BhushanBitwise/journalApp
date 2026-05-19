package com.thebhushan.f1_journalApp.entity;

import lombok.Data;
import lombok.NonNull;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "users") //Collection mapping
@Data
public class User {
    @Id //MongoDB me _id field se map hota hai -> Primary key --> ye  annotation aas kam  karat ki khalachy id la mongoDb chy Object Id madhe  convert karat .
    private ObjectId id;
    @Indexed(unique = true)// Fast search + unique
    @NonNull // Null value allow nahi karega  -> Agar null aaya → error throw
    private String userName;
    @NonNull// Null value allow nahi karega  -> Agar null aaya → error throw
    private String password;
    @DBRef // Relationship-> Dusre collection se relation banata hai-> User → JournalEntry ko reference karega
    private List<JournalEntry> journalEntries=new ArrayList<>();
    private List<String> roles;


}
