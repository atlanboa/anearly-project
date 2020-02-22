package com.anearly.rest.config;

import javax.sql.DataSource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.anearly.rest.security.JwtInterceptor;

@Configuration
@MapperScan(basePackages = "com.anearly.rest.db.mapper")
//com.simplify.sample.db.mapper
@EnableTransactionManagement
public class ApplicationConfig implements WebMvcConfigurer{

	@Bean
	public SqlSessionFactory sqlSessionFactory(DataSource dataSource) throws Exception {
		
		System.out.println("sqlSessionFactory 생성");
		
		final SqlSessionFactoryBean sessionFactory = new SqlSessionFactoryBean();
		sessionFactory.setDataSource(dataSource);
		PathMatchingResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
		sessionFactory.setMapperLocations(resolver.getResources("classpath:mybatis/mapper/*.xml"));
		return sessionFactory.getObject();
	}

	@Bean
	public SqlSessionTemplate sqlSessionTemplate(SqlSessionFactory sqlSessionFactory) throws Exception {
		System.out.println("sqlSessionTemplate 생성");
		final SqlSessionTemplate sqlSessionTemplate = new SqlSessionTemplate(sqlSessionFactory);
		return sqlSessionTemplate;
	}
	
	private static final String[] EXCLUDE_PATHS = 
		{ "/swagger-resources/**", "/swagger-ui.html", "/swagger/**", "/error", "/webjars/**"
				, "/swagger-ui.html#/**/**",  "/message",
				"/history", "/file", "/topic/chatting", "/api/surveys",
				"/userapi/auth","/userapi/auth/**", "/userapi/user/email", "/userapi/email", "/userapi/email",
				"/userapi/email", "/userapi/user/nickname", "/userapi/user/phone", "/userapi/user/send/password",
				"/userapi/login", "/userapi/user", "/api/person", "/userapi/user/phone", "/user/send/password/**", "/user/send/password",
				"/surveyapi/surveys", "/api/person/**", "/surveyapi/survey/approval/**", "/userapi/user/email/**", "/userapi/user/nickname/**"
				,"/surveyapi/survey/id/**"
	};

	@Autowired
	private JwtInterceptor jwtInterceptor;

	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		System.out.println("addInterceptors 실행");
		registry.addInterceptor(jwtInterceptor)
		.addPathPatterns("/**","/**/**","/**/**/**","/**/**/**/**")
		.excludePathPatterns(EXCLUDE_PATHS);
	}

}
