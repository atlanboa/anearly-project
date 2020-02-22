package com.anearly.rest.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.anearly.rest.db.dto.UserDto;
import com.anearly.rest.db.service.UserService;
import com.anearly.rest.security.JwtService;
import com.anearly.rest.util.GenerateCertNumber;
import com.anearly.rest.util.GenerateCertPassword;

import io.swagger.annotations.ApiOperation;

@CrossOrigin
@RestController
@RequestMapping("/userapi")
public class UserController {

	@Autowired
	private UserService service;
	@Autowired
	private JwtService jwtService;

	@ApiOperation(value = "인자값 none, 모든 유저 반환", notes = "데이터베이스에 존재하는 모든 유저 반환합니다.")
	@GetMapping("/users")
	public ResponseEntity<List<UserDto>> getAllUser() throws Exception {

		String authoriy = service.selectUserById(Integer.parseInt(jwtService.get("id"))).getAuthority();
		List<UserDto> list = null;
		if (authoriy.equals("admin")) {
			list = service.selectAllUser();
		}
		if (list == null)
			return new ResponseEntity("No authority for this request", HttpStatus.NO_CONTENT);
		else
			return new ResponseEntity(list, HttpStatus.OK);

	}

	@ApiOperation(value = "인자값 none, 토큰으로 유저 정보 요청", notes = "토큰을 발급받은 유저 정보를 요청합니다.")
	@GetMapping("/user/token")
	public ResponseEntity<UserDto> getMyInformation() throws Exception {
		UserDto rDto = null;
		rDto = service.selectUserById(Integer.parseInt(jwtService.get("id")));

		if (rDto == null)
			return new ResponseEntity(HttpStatus.NO_CONTENT);
		else
			return new ResponseEntity(rDto, HttpStatus.OK);

	}

	@ApiOperation(value = "인증할 이메일", notes = "인증할 이메일에 인증 번호를 전송해주는 api입니다 " + "성공하면 Success 문자와 함께 HttpStatus.OK 반환"
			+ "실패하면 Fail 문자와 함께 HttpStatus.EXPECTATION_FAILED 반환")
	@GetMapping("/auth/{email}")
	public ResponseEntity<String> sendEmail(@PathVariable String email) throws Exception {

		// code 생성
		GenerateCertNumber ge = new GenerateCertNumber();
		ge.setCertNumLength(6);
		String code = ge.excuteGenerate();

		boolean send = service.sendSignUpEmail(email, code);

		if (send) {
			return new ResponseEntity<String>("Mail Success", HttpStatus.OK);
		} else {
			return new ResponseEntity<String>("Mail Fail", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@ApiOperation(value = "이메일 중복 확인", notes = "이메일 중복 확인을 하는 api")
	@GetMapping("/user/email/{email}")
	public ResponseEntity<String> checkEmailUnique(@PathVariable String email) throws Exception {
		UserDto rDto = null;
		rDto = service.selectUserByEmail(email);

		if (rDto == null)
			return new ResponseEntity<String>("true", HttpStatus.OK);
		else
			return new ResponseEntity<String>("false", HttpStatus.OK);

	}

	@ApiOperation(value = "닉네임 중복 확인", notes = "닉네임 중복 확인을 하는 api")
	@GetMapping("/user/nickname/{nickname}")
	public ResponseEntity<String> checkNicknameUnique(@PathVariable String nickname) throws Exception {
		UserDto rDto = null;
		rDto = service.selectUserByNickname(nickname);

		if (rDto == null)
			return new ResponseEntity<String>("true", HttpStatus.OK);
		else
			return new ResponseEntity<String>("false", HttpStatus.OK);
	}

	@ApiOperation(value = "핸드폰으로 이메일 찾기", notes = "핸드폰 번호로 이메일 찾는 api 전송되어야 하는 번호 형식은 01012341234")
	@GetMapping("/user/phone/{phone}")
	public ResponseEntity<String> getEmailByPhone(@PathVariable String phone) throws Exception {
		UserDto rDto = null;
		rDto = service.selectUserByPhone(phone);

		if (rDto == null)
			return new ResponseEntity<String>("not-existed-user", HttpStatus.NO_CONTENT);
		else
			return new ResponseEntity<String>(rDto.getEmail(), HttpStatus.OK);
	}

	@ApiOperation(value = "이메일에 pw 전송", notes = "데이터베이스의 레코드중 이메일과 일치하는 레코드의 비밀번호를 갱신해주고 이 8자리 비밀번호를 이메일로 전송해줍니다.")
	@GetMapping("/user/send/password/{email}")
	public ResponseEntity<String> sendPasswordToEmail(@PathVariable String email) throws Exception {

		GenerateCertPassword gcp = new GenerateCertPassword();
		gcp.setPwdLength(8);
		String newPassword = gcp.excuteGenerate();

		boolean send = service.sendPasswordEmail(email, newPassword);

		if (send)
			return new ResponseEntity<String>("mail-sent", HttpStatus.OK);
		else
			return new ResponseEntity<String>("mail-not-sent", HttpStatus.OK);
	}

	@ApiOperation(value = "로그인 api", notes = "회원 가입이 안된 유저면 non-existed-user와 HttpStatus.NO_CONTENT"
			+ "인증이 안된 유저면 non-verified-user와 HttpsStatus.NOT_ACCEPTABLE" + "인증까지 완료된 유저면 트큰과 함께 HttpStatus.OK")
	@PostMapping("/login")
	public ResponseEntity<String> login(@RequestBody UserDto user) throws Exception {
		UserDto rDto = null;
		rDto = service.selectUser(user);

		/*
		 * 1. 회원 가입도 안된 상태 2. 회원 가입은 된 상태이나 인증이 안된 상태 3. 인증이 된 상태
		 */

		// 1번 상태
		if (rDto == null) {
			return new ResponseEntity<String>("non-existed-user", HttpStatus.NO_CONTENT);
		}
		// 2번 상태
		else if (!rDto.getEmail_verification().equals("true")) {
			return new ResponseEntity<String>("non-verified-user", HttpStatus.NOT_ACCEPTABLE);
		}
		// 3번 상태
		else {
			/*
			 * key :: data :: subject :: user의 primary key
			 */
			String jwt = jwtService.create("id", rDto.getId(), rDto.getEmail(), rDto.getAuthority());
			return new ResponseEntity<String>(jwt, HttpStatus.OK);

		}

	}

	@ApiOperation(value = "회원가입 폼 데이터", notes = "요청한 데이터를 데이터베이스에 insert하는 api")
	@PostMapping("/user")
	public ResponseEntity<String> signUp(@RequestBody UserDto user) throws Exception {

		service.insertUser(user);
		return new ResponseEntity<String>("회원가입이 완료되었습니다.", HttpStatus.OK);

	}

	@ApiOperation(value = "유저 정보를 업데이트 합니다. 인자값 유저 정보", notes = "유저 정보를 업데이트합니다")
	@PutMapping("/user/update")
	public ResponseEntity<UserDto> userUpdate(@RequestBody UserDto user) throws Exception {
		service.updateUser(user);
		return new ResponseEntity("업데이트 완료", HttpStatus.OK);

	}

	@ApiOperation(value = "인자값 user pk값, 유저 삭제", notes = "특정 user pk 유저를 삭제합니다.")
	@DeleteMapping("/user/delete/{id}")
	public ResponseEntity deleteUser(@PathVariable int id) throws Exception {
		UserDto rDto = null;
		rDto = service.selectUserById(id);

		if (rDto != null) {
			service.deleteUser(id);
			return new ResponseEntity<UserDto>(rDto, HttpStatus.OK);
		}

		else
			return new ResponseEntity<String>("non-existed_user", HttpStatus.NOT_FOUND);

	}

	@ApiOperation(value = "email :: 인증할 이메일 , code :: 인증코드", notes = "이메일 인증 코드 확인 api입니다 "
			+ "성공하면 Success 문자와 함께 HttpStatus.OK 반환" + "실패하면 Fail 문자와 함께 HttpStatus.EXPECTATION_FAILED 반환")
	@PutMapping("/auth/{email}/{code}")
	public ResponseEntity<String> authEmail(@PathVariable String email, @PathVariable String code) throws Exception {
		String user_code = service.selectUserByEmail(email).getEmail_verification();
		boolean match = user_code.equals(code) ? true : false;

		if (match) {
			service.updateVerification(email, "true");
			return new ResponseEntity<String>("Success", HttpStatus.OK);
		} else {
			return new ResponseEntity<String>("Fail", HttpStatus.EXPECTATION_FAILED);
		}
	}
	
	@ApiOperation(value = "유저 패스워드 변경", notes = "패스워드 변경 api입니다 ")
	@PutMapping("/user/password")
	public ResponseEntity<String> authEmail(@RequestBody UserDto user) throws Exception {
		
		service.updateNewPassword(user.getEmail(), user.getPw());
		return new ResponseEntity<String>("패스워드 변경되었습니다.", HttpStatus.OK);
	}

}
