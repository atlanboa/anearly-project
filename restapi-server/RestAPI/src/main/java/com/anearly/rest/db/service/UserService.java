package com.anearly.rest.db.service;

import java.util.List;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.anearly.rest.db.dto.UserDto;
import com.anearly.rest.db.mapper.UserMapper;

@Service
public class UserService {

	@Autowired
	private UserMapper mapper;
	
	public UserDto selectUser(UserDto user) throws Exception {
		return mapper.selectUser(user);
	}

	public List<UserDto> selectAllUser() throws Exception {
		return mapper.selectAllUser();
	}

	public void insertUser(UserDto user) throws Exception {
		mapper.insertUser(user);
	};

	public void updateUser(UserDto user) throws Exception {
		mapper.updateUser(user);
	};

	public void deleteUser(int id) throws Exception {
		mapper.deleteUser(id);
	};

	public UserDto selectUserById(int id) throws Exception {
		return mapper.selectUserById(id);
	};

	public void updateUserPoint(int user_id, int survey_id) throws Exception {
		mapper.updateUserPoint(user_id, survey_id);
	};
	
	public void updateUserPoint2(int user_id, int budget) throws Exception {
		mapper.updateUserPoint2(user_id, budget);
	};

	public void updateVerification(String email, String code) throws Exception {
		mapper.updateVerification(email, code);
	};

	public boolean sendSignUpEmail(String email, String code) throws Exception {

		System.out.println(email);

		// 유저 테이블의 이메일 인증란을 인증키값으로 바꿔줍니다.
		updateVerification(email, code);

		String user = "atlanboa1@gmail.com"; // 패스워드
		String password = "arymqqugsrncjtoa";

		Properties prop = new Properties();
		prop.put("mail.smtp.host", "smtp.gmail.com");
		prop.put("mail.smtp.port", 465);
		prop.put("mail.smtp.auth", "true");
		prop.put("mail.smtp.ssl.enable", "true");
		prop.put("mail.smtp.ssl.trust", "smtp.gmail.com");

		Session session = Session.getInstance(prop, new javax.mail.Authenticator() {
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(user, password);
			}

		});
		try {
			MimeMessage message = new MimeMessage(session);
			message.setFrom(new InternetAddress(user));

			// 수신자 메일 주소
			message.addRecipient(Message.RecipientType.TO, new InternetAddress(email));

			// 메일 제목
			message.setSubject("An Early Verification Number has been sent");
			// 메일 내용
			message.setText("The Verification Code is :: " + code);

			// send the message
			Transport.send(message);
			System.out.println("Success Message Send");

			return true;
		} catch (MessagingException e) {
			e.printStackTrace();
			return false;
		}
	};

	public boolean sendPasswordEmail(String email, String newPassword) throws Exception {


		
		updateNewPassword(email, newPassword);

		String user = "atlanboa1@gmail.com"; // 패스워드
		String password = "arymqqugsrncjtoa";

		Properties prop = new Properties();
		prop.put("mail.smtp.host", "smtp.gmail.com");
		prop.put("mail.smtp.port", 465);
		prop.put("mail.smtp.auth", "true");
		prop.put("mail.smtp.ssl.enable", "true");
		prop.put("mail.smtp.ssl.trust", "smtp.gmail.com");

		Session session = Session.getDefaultInstance(prop, new javax.mail.Authenticator() {
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(user, password);
			}

		});
		try {
			MimeMessage message = new MimeMessage(session);
			message.setFrom(new InternetAddress(user));

			// 수신자 메일 주소
			message.addRecipient(Message.RecipientType.TO, new InternetAddress(email));

			// 메일 제목
			message.setSubject("An Early New Password has been sent");
			// 메일 내용
			message.setText("The Password is :: " + newPassword);

			// send the message
			Transport.send(message);
			System.out.println("Success Message Send");

			return true;
		} catch (MessagingException e) {
			e.printStackTrace();
			return false;
		}
	};
	
	public void updateNewPassword(@Param("email") String email, @Param("password") String password) throws Exception{
		mapper.updateNewPassword(email, password);
	};

	public UserDto selectUserByEmail(String email) throws Exception {
		return mapper.selectUserByEmail(email);
	}

	public UserDto selectUserByNickname(String nickname) throws Exception {
		return mapper.selectUserByNickname(nickname);
	}

	public UserDto selectUserByPhone(String phone) throws Exception {
		return mapper.selectUserByPhone(phone);
	};

}
