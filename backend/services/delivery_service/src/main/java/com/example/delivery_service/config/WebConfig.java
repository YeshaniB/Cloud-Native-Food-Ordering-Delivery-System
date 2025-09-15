package com.example.delivery_service.config;

import com.example.delivery_service.model.Location;
import com.example.delivery_service.converter.StringToLocationConverter;
import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addFormatters(FormatterRegistry registry) {
        registry.addConverter(new StringToLocationConverter());
    }
}