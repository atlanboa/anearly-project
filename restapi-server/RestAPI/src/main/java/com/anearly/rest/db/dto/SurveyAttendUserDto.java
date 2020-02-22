package com.anearly.rest.db.dto;

public class SurveyAttendUserDto {
	private int id;
	private int survey_id;
	private int user_id;

	public SurveyAttendUserDto(int id, int survey_id, int user_id) {
		super();
		this.id = id;
		this.survey_id = survey_id;
		this.user_id = user_id;
	}

	public SurveyAttendUserDto() {
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getSurvey_id() {
		return survey_id;
	}

	public void setSurvey_id(int survey_id) {
		this.survey_id = survey_id;
	}

	public int getUser_id() {
		return user_id;
	}

	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}

	@Override
	public String toString() {
		return "SurveyAttendUserDto [id=" + id + ", survey_id=" + survey_id + ", user_id=" + user_id + "]";
	}

}
