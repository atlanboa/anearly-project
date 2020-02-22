package com.anearly.rest.db.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.anearly.rest.db.dto.UserDto;

public interface UserMapper {

	UserDto selectUser(UserDto user) throws Exception;

	List<UserDto> selectAllUser() throws Exception;

	void insertUser(UserDto user) throws Exception;

	void updateUser(UserDto user) throws Exception;

	void deleteUser(int id) throws Exception;
	
	UserDto selectUserById(int id) throws Exception;
	
	void updateUserPoint(@Param("user_id") int user_id, @Param("survey_id") int survey_id) throws Exception;
	
	void updateUserPoint2(@Param("user_id") int user_id, @Param("budget") int budget) throws Exception;
	
	void updateVerification(@Param("email") String email, @Param("code") String code) throws Exception;
	
	void updateNewPassword(@Param("email") String email, @Param("password") String password) throws Exception;
	
	UserDto selectUserByEmail(String email) throws Exception;
	
	UserDto selectUserByNickname(String nickname) throws Exception;
	
	UserDto selectUserByPhone(String phone) throws Exception;

}
