package com.kauppa.kaupparest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.kauppa.kaupparest.repo")
@EntityScan(basePackages = "com.kauppa.kaupparest.data")
public class KaupparestApplication {

	public static void main(String[] args) {
		SpringApplication.run(KaupparestApplication.class, args);
	}
}
