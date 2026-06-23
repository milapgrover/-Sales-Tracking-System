package com.example.SalesTrackingBackEnd;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class SalesTrackingBackEndApplication {

	public static void main(String[] args) {
		SpringApplication.run(SalesTrackingBackEndApplication.class, args);
	}

}
