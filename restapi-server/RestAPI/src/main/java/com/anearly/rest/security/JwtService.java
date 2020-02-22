package com.anearly.rest.security;

import java.io.UnsupportedEncodingException;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;


@Service("jwtService")
public class JwtService{

	private static final String SALT =  "luvookSecret";
	
	Logger log = LoggerFactory.getLogger(JwtService.class);

	/**
	 * 
	 * @param key "id"
	 * @param data user_pk
	 * @param subject user_email
	 * @return jwt token string value
	 * 
	 */
	public <T> String create(String key, T data, String subject, String authority){
		String jwt = Jwts.builder()
						 .setHeaderParam("typ", "JWT")
						 .setHeaderParam("alg", "HS256")
						 .setSubject(subject)
						 .claim(key, data)
						 .claim("role", authority)
						 .setExpiration(new Date(System.currentTimeMillis() + 1 * (1000*60*60*24)))
						 .signWith(SignatureAlgorithm.HS256, this.generateKey())
						 .compact();
		return jwt;
	}
	
	private byte[] generateKey(){
		byte[] key = null;
		try {
			key = SALT.getBytes("UTF-8");
		} catch (UnsupportedEncodingException e) {
			if(log.isInfoEnabled()){
				e.printStackTrace();
			}else{
				log.error("Making JWT Key Error ::: {}", e.getMessage());
			}
		}
		
		return key;
	}

	public boolean isUsable(String jwt) {
		try{
			Jws<Claims> claims = Jwts.parser()
					  .setSigningKey(this.generateKey())
					  .parseClaimsJws(jwt);
			return true;
			
		}catch (Exception e) {
			
			if(log.isInfoEnabled()){
				e.printStackTrace();
			}else{
				log.error(e.getMessage());
			}
			throw new UnauthorizedException();

			/*개발환경!!!
			 * return false;*/
			 
		}
	}
	
	public String get(String key) {
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
		String jwt = request.getHeader("Authorization");
		Jws<Claims> claims = null;
		try {
			claims = Jwts.parser()
						 .setSigningKey(SALT.getBytes("UTF-8"))
						 .parseClaimsJws(jwt);
		} catch (Exception e) {
			if(log.isInfoEnabled()){
				e.printStackTrace();
			}else{
				log.error(e.getMessage());
			}
			throw new UnauthorizedException();
			
			/*개발환경
			Map<String,Object> testMap = new HashMap<>();
			testMap.put("memberId", 2);
			return testMap;*/
		}
		String value = claims.getBody().get(key)+"";
		return value;
	}

//	public int getMemberId() {
//		return (int)this.get("member").get("memberId");
//	}
}