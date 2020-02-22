package com.anearly.rest;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.anearly.rest.db.service.UserService;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserServiceIntegrationTest {

	@Autowired
	private UserService userService;

	
	@Test
	public void uniqueCheckTest() throws Exception {
//		UserDto user = userService.selectUserByEmail("atlanboa@gmail.com");
//		assertEquals("atlanboa@gmail.com", user.getEmail());
//		
//		user = userService.selectUserByNickname("TestNickName");
//		assertEquals("TestNickName", user.getNickname());
//		
//		user = userService.selectUserByPhone("01028501326");
//		assertEquals("atlanboa@gmail.com", user.getEmail());
		
//		userService.updateUserPoint2(1, 99999);
//		UserDto user = userService.selectUserById(1);
//		System.out.println(user.getReward_point());
//		assertEquals("ssafy1@ssafy.com", user.getEmail());
		

	}
	
}
