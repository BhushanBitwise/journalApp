package com.thebhushan.f1_journalApp.dto;

import lombok.Data;

@Data
public class UserDTO {

    private String email;
    private String userName;
    private String password;
    private boolean sentimentAnalysis;
}