package com.anearly.rest.db.dto;

public class UserDto {

	private int id;
	private String nickname;
	private String email;
	private String pw;
	private String email_verification;
	private int gender;
	private int age;
	private String phone;
	private int reward_point;
	private String authority;

	
	
	public UserDto(int id, String nickname, String email, String pw, String email_verification, int gender, int age,
			String phone, int reward_point, String authority) {
		super();
		this.id = id;
		this.nickname = nickname;
		this.email = email;
		this.pw = pw;
		this.email_verification = email_verification;
		this.gender = gender;
		this.age = age;
		this.phone = phone;
		this.reward_point = reward_point;
		this.authority = authority;
	}

	public UserDto(int id, String nickname, String email, String pw, String email_verification, int gender, int age,
			String phone, int reward_point) {
		super();
		this.id = id;
		this.nickname = nickname;
		this.email = email;
		this.pw = pw;
		this.email_verification = email_verification;
		this.gender = gender;
		this.age = age;
		this.phone = phone;
		this.reward_point = reward_point;
	}

	public UserDto(int id, String nickname, String email, String pw, int gender, int age, String phone,
			int reward_point) {
		super();
		this.id = id;
		this.nickname = nickname;
		this.email = email;
		this.pw = pw;
		this.gender = gender;
		this.age = age;
		this.phone = phone;
		this.reward_point = reward_point;
	}
	
	public UserDto(int id, int reward_point) {
		super();
		this.id = id;
		this.reward_point = reward_point;
	}
	
	public UserDto() {}

	public String getAuthority() {
		return authority;
	}

	public void setAuthority(String authority) {
		this.authority = authority;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPw() {
		return pw;
	}

	public void setPw(String pw) {
		this.pw = pw;
	}

	public String getEmail_verification() {
		return email_verification;
	}

	public void setEmail_verification(String email_verification) {
		this.email_verification = email_verification;
	}

	public int getGender() {
		return gender;
	}

	public void setGender(int gender) {
		this.gender = gender;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public int getReward_point() {
		return reward_point;
	}

	public void setReward_point(int reward_point) {
		this.reward_point = reward_point;
	}

	@Override
	public String toString() {
		return "UserDto [id=" + id + ", nickname=" + nickname + ", email=" + email + ", pw=" + pw
				+ ", email_verification=" + email_verification + ", gender=" + gender + ", age=" + age + ", phone="
				+ phone + ", reward_point=" + reward_point + "]";
	}

}
