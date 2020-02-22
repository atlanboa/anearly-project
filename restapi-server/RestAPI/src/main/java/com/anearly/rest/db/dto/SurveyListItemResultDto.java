package com.anearly.rest.db.dto;

public class SurveyListItemResultDto {
	private int id;
	private int survey_list_item_id;
	private int user_id;

	public SurveyListItemResultDto(int id, int survey_list_item_id, int user_id) {
		super();
		this.id = id;
		this.survey_list_item_id = survey_list_item_id;
		this.user_id = user_id;
	}

	public SurveyListItemResultDto(int survey_list_item_id, int user_id) {
		super();
		this.survey_list_item_id = survey_list_item_id;
		this.user_id = user_id;
	}
	
	public SurveyListItemResultDto() {
	}

	public int getid() {
		return id;
	}

	public void setid(int id) {
		this.id = id;
	}

	public int getSurvey_list_item_id() {
		return survey_list_item_id;
	}

	public void setSurvey_list_item_id(int survey_list_item_id) {
		this.survey_list_item_id = survey_list_item_id;
	}

	public int getUser_id() {
		return user_id;
	}

	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}

	@Override
	public String toString() {
		return "SurveyListItemResultDto [id=" + id
				+ ", survey_list_item_id=" + survey_list_item_id + ", user_id=" + user_id + "]";
	}

}
