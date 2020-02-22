package com.anearly.rest;

import static com.google.common.base.Predicates.or;
import static springfox.documentation.builders.PathSelectors.regex;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.google.common.base.Predicate;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;


@Configuration
@EnableSwagger2
public class SwaggerConfig {

	@Bean
	public Docket postsApi() {
		return new Docket(DocumentationType.SWAGGER_2).groupName("public-api")
				.apiInfo(apiInfo()).select().paths(postPaths()).build();
	}

	private Predicate<String> postPaths() {
		return or(regex("/userapi/posts.*"), regex("/userapi.*"),
				regex("/surveyapi/posts.*"), regex("/surveyapi.*"),
				regex("/fileuploadapi/posts.*"), regex("/fileuploadapi.*"),
		regex("/api/posts.*"), regex("/api.*")
		);
	}
	
//	private Predicate<String> postPaths() {
//		return or(regex("/posts.*"), regex("/*"));
//	}

	private ApiInfo apiInfo() {
		return new ApiInfoBuilder().title("An Early API")
			.description("An Early API Reference for Developers")
			.termsOfServiceUrl("미정입니다")
			.contact(
				new Contact("SANG HEON KIM", "https://atlanboa.github.com/index.html",
				"atlanboa@gmail.com"))
			.license("SANGHEON License 0.9")
			.licenseUrl("https://atlanboa.github.com")
			.version("1.0")
			.build();
	}
}
