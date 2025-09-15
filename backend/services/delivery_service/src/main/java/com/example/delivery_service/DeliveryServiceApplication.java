package com.example.delivery_service;

import ch.qos.logback.core.pattern.Converter;
import com.example.delivery_service.converter.StringToLocationConverter;
import com.example.delivery_service.model.Location;
import org.springframework.boot.SpringApplication;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication(scanBasePackages = "com.example.delivery_service")
@EnableMongoRepositories(basePackages = "com.example.delivery_service.repository")
@EnableScheduling
public class DeliveryServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(DeliveryServiceApplication.class, args);

	}
//	@Bean
//	public RestTemplate restTemplate(RestTemplateBuilder builder) {
//		return builder.build();
//	}

	@Value("${rest.template.connection.timeout}")
	private int connectTimeout;

	@Value("${rest.template.read.timeout}")
	private int readTimeout;
	@Bean
	public RestTemplate restTemplate() {
		SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
		factory.setConnectTimeout(connectTimeout);
		factory.setReadTimeout(readTimeout);
		return new RestTemplate(factory);
	}



}