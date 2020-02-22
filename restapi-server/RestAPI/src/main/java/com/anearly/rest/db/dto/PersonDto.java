package com.anearly.rest.db.dto;

public class PersonDto {
	private int device;
	private int gender;
	private int age;

	public PersonDto(int device, int gender, int age) {
		super();
		this.device = device;
		this.gender = gender;
		this.age = age;
	}

	public PersonDto() {
	}

	public int getDevice() {
		return device;
	}

	public void setDevice(int device) {
		this.device = device;
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

	@Override
	public String toString() {
		return "PersonDto [device=" + device + ", gender=" + gender + ", age=" + age + "]";
	}

}
