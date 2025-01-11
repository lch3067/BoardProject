package com.apibackserver.backend_api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.apibackserver.backend_api")
public class BackendApiApplication {
	public static void main(String[] args) {
		SpringApplication.run(BackendApiApplication.class, args);
	}

}
