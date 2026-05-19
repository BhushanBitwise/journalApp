package com.thebhushan.f1_journalApp;

import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.data.mongodb.MongoDatabaseFactory;
import org.springframework.data.mongodb.MongoTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableTransactionManagement
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

}


