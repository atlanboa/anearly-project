package com.anearly.rest.db.dto;

public class SurveyReviewDto {
	private int id;
	private int survey_id;
	private int survey_type;
	private String title;
	private int display_order;
	
	public SurveyReviewDto(int survey_id, int survey_type, String title, int display_order) {
		super();
		this.survey_id = survey_id;
		this.survey_type = survey_type;
		this.title = title;
		this.display_order = display_order;
	}

	public SurveyReviewDto(int id, int survey_id, int survey_type, String title, int display_order) {
		super();
		this.id = id;
		this.survey_id = survey_id;
		this.survey_type = survey_type;
		this.title = title;
		this.display_order = display_order;
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

	public int getSurvey_type() {
		return survey_type;
	}

	public void setSurvey_type(int survey_type) {
		this.survey_type = survey_type;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public int getDisplay_order() {
		return display_order;
	}

	public void setDisplay_order(int display_order) {
		this.display_order = display_order;
	}

	@Override
	public String toString() {
		return "SurveyReviewDto [id=" + id + ", survey_id=" + survey_id + ", survey_type=" + survey_type + ", title="
				+ title + ", display_order=" + display_order + "]";
	}

	

}
