package com.thebhushan.f1_journalApp.service;

import com.thebhushan.f1_journalApp.api.response.WeatherResponse;
import com.thebhushan.f1_journalApp.cache.AppCache;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@Slf4j
public class WeatherService {

    @Value("${weather.api.key}")
    private String apiKey;

    @Autowired
    private RestTemplate restTemplate;
    @Autowired
    private AppCache cache;
    @Autowired
    private RedisService redisService;



    public WeatherResponse getWeather(String city) {
        WeatherResponse weatherResponse = redisService.get("weather_of_" + city, WeatherResponse.class);
        if (weatherResponse != null) {
            log.info("DATA FROM REDIS");
            return weatherResponse;
        }
        log.info("DATA FROM DB WEATHER API");
        String finalAPI = cache.appCache.get("weather_api").replace("{city}", city).replace("{apiKey}", apiKey);
        ResponseEntity<WeatherResponse> response = restTemplate.exchange(finalAPI, HttpMethod.GET, null, WeatherResponse.class);
        WeatherResponse body = response.getBody();
        if (body != null) {
            redisService.set("weather_of_" + city, body, 300L);
        }
        return body;
    }
}