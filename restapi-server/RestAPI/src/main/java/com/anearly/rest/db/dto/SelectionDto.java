package com.anearly.rest.db.dto;

public class SelectionDto {
	private int display_order;
	private String content;
	public SelectionDto(int display_order, String content) {
		super();
		this.display_order = display_order;
		this.content = content;
	}
	public int getDisplay_order() {
		return display_order;
	}
	public void setDisplay_order(int display_order) {
		this.display_order = display_order;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	@Override
	public String toString() {
		return "SelectionDto [display_order=" + display_order + ", content=" + content + "]";
	}
	
	
}
