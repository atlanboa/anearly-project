package com.anearly.rest.security;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class JwtInterceptor implements HandlerInterceptor{
	private static final String HEADER_AUTH = "Authorization";

	@Autowired
	private JwtService jwtService;

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		if (request.getMethod().equals("OPTIONS"))
	         return true;
		
		final String token = request.getHeader(HEADER_AUTH);

		if(token != null && jwtService.isUsable(token)){
			System.out.println("*****************올바른 사용자 입니다..*******************");
			return true;
		}else{
			System.out.println("*****************권한이 없는 사용자 입니다..*******************");
			throw new UnauthorizedException();
		}
	}
}
