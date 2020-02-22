package com.anearly.rest.db.dto;

public class SurveySubmitDto {
	private int id;
	private int survey_type;
	private String content;
	public SurveySubmitDto(int id, int survey_type, String content) {
		super();
		this.id = id;
		this.survey_type = survey_type;
		this.content = content;
	}
	
	public SurveySubmitDto() {}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getSurvey_type() {
		return survey_type;
	}

	public void setSurvey_type(int survey_type) {
		this.survey_type = survey_type;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	@Override
	public String toString() {
		return "SurveySubmitDto [id=" + id + ", survey_type=" + survey_type + ", content=" + content + "]";
	}
	
	
}
