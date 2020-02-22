package com.anearly.rest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.scheduling.annotation.EnableScheduling;

import com.anearly.rest.file.property.FileUploadProperties;

@SpringBootApplication
@EnableScheduling
@EnableConfigurationProperties({
    FileUploadProperties.class
})
public class RestApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(RestApiApplication.class, args);
	}

}
