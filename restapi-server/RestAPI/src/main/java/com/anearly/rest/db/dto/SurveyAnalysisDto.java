package com.anearly.rest.db.dto;

import java.util.List;

public class SurveyAnalysisDto {
	private int id;
	private String title;
	private List<SurveyAnalysisListDto> list;

	public SurveyAnalysisDto(int id, String title, List<SurveyAnalysisListDto> list) {
		super();
		this.id = id;
		this.title = title;
		this.list = list;
	}

	public SurveyAnalysisDto() {
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public List<SurveyAnalysisListDto> getList() {
		return list;
	}

	public void setList(List<SurveyAnalysisListDto> list) {
		this.list = list;
	}

	@Override
	public String toString() {
		return "SurveyAnalysisDto [id=" + id + ", title=" + title + ", list=" + list + "]";
	}

}
