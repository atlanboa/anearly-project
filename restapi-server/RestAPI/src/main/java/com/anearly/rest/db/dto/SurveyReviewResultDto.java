package com.anearly.rest.db.dto;

public class SurveyReviewResultDto {
	private int id;
	private int survey_review_id;
	private int user_id;
	private String content;

	public SurveyReviewResultDto(int id, int survey_review_id, int user_id, String content) {
		super();
		this.id = id;
		this.survey_review_id = survey_review_id;
		this.user_id = user_id;
		this.content = content;
	}
	
	public SurveyReviewResultDto( int survey_review_id, int user_id, String content) {
		super();
		this.survey_review_id = survey_review_id;
		this.user_id = user_id;
		this.content = content;
	}

	public SurveyReviewResultDto() {
	}

	public int getid() {
		return id;
	}

	public void setid(int id) {
		this.id = id;
	}

	public int getSurvey_review_id() {
		return survey_review_id;
	}

	public void setSurvey_review_id(int survey_review_id) {
		this.survey_review_id = survey_review_id;
	}

	public int getUser_id() {
		return user_id;
	}

	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	@Override
	public String toString() {
		return "SurveyReviewResultDto [id=" + id + ", survey_review_id="
				+ survey_review_id + ", user_id=" + user_id + ", content=" + content + "]";
	}

}
