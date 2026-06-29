package com.thebhushan.f1_journalApp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.data.mongodb.MongoDatabaseFactory;
import org.springframework.data.mongodb.MongoTransactionManager;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
@EnableTransactionManagement
@EnableScheduling
@EnableCaching
public class F1JournalAppApplication {

	public static void main(String[] args) {

	ConfigurableApplicationContext context=SpringApplication.run(F1JournalAppApplication.class, args);
	ConfigurableEnvironment environment= context.getEnvironment();
	System.out.println(environment.getActiveProfiles()[0]);
	}

//	PlatformTransactionManager   ch  implementation dhil karan
	@Bean
	public PlatformTransactionManager NameKahiPnDya(MongoDatabaseFactory dbFactory){
		return new MongoTransactionManager(dbFactory);
	}
	@Bean
	public RestTemplate restTemplate() {
		return new RestTemplate();

	}

}


