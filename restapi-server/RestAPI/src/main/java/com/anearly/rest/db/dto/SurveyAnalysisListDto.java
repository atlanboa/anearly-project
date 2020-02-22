package com.anearly.rest.db.dto;

public class SurveyAnalysisListDto {

	private String content;
	private int count;
	public SurveyAnalysisListDto(String content, int count) {
		super();
		this.content = content;
		this.count = count;
	}
	
	public SurveyAnalysisListDto() {
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

	@Override
	public String toString() {
		return "SurveyAnalysisListDto [content=" + content + ", count=" + count + "]";
	}
	
	
}
