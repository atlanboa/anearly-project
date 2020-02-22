package com.anearly.rest.db.dto;

public class SurveyListItemDto {
	private int id;
	private int survey_list_id;
	private String content;
	private int display_order;
	public SurveyListItemDto(int survey_list_id, String content, int display_order) {
		super();
		this.survey_list_id = survey_list_id;
		this.content = content;
		this.display_order = display_order;
	}
	public SurveyListItemDto(int id, int survey_list_id, String content, int display_order) {
		super();
		this.id = id;
		this.survey_list_id = survey_list_id;
		this.content = content;
		this.display_order = display_order;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getSurvey_list_id() {
		return survey_list_id;
	}
	public void setSurvey_list_id(int survey_list_id) {
		this.survey_list_id = survey_list_id;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public int getDisplay_order() {
		return display_order;
	}
	public void setDisplay_order(int display_order) {
		this.display_order = display_order;
	}
	@Override
	public String toString() {
		return "SurveyListItemDto [id=" + id + ", survey_list_id=" + survey_list_id + ", content=" + content
				+ ", display_order=" + display_order + "]";
	}
	
	
}
