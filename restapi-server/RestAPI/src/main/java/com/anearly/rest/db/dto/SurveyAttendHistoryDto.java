package com.anearly.rest.db.dto;

public class SurveyAttendHistoryDto {
	private String title;
	private int point_per_participant;

	public SurveyAttendHistoryDto(String title, int point_per_participant) {
		super();
		this.title = title;
		this.point_per_participant = point_per_participant;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public int getPoint_per_participant() {
		return point_per_participant;
	}

	public void setPoint_per_participant(int point_per_participant) {
		this.point_per_participant = point_per_participant;
	}

	@Override
	public String toString() {
		return "SurveyAttendHistoryDto [title=" + title + ", point_per_participant=" + point_per_participant + "]";
	}

}
