package com.thebhushan.f1_journalApp.api.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
public class WeatherResponse {

    private Main main;

    @Getter
    @Setter
    public static class Main {

        private double temp;

        @JsonProperty("feels_like")
        private double feelsLike;
    }
}