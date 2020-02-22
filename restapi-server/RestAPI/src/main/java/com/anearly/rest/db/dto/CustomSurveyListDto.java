package com.anearly.rest.db.dto;

import java.util.List;


public class CustomSurveyListDto {
	private int type;
	private String title;
	private int display_order;
	private List<SelectionDto> selects;
	public CustomSurveyListDto(int type, String title, int display_order, List<SelectionDto> selects) {
		super();
		this.type = type;
		this.title = title;
		this.display_order = display_order;
		this.selects = selects;
	}
	public CustomSurveyListDto() {	}
	public int getType() {
		return type;
	}
	public void setType(int type) {
		this.type = type;
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
	public List<SelectionDto> getSelects() {
		return selects;
	}
	public void setSelects(List<SelectionDto> selects) {
		this.selects = selects;
	}
	@Override
	public String toString() {
		return "CustomSurveyListDto [type=" + type + ", title=" + title + ", display_order=" + display_order
				+ ", selects=" + selects + "]";
	}
	
	
}
