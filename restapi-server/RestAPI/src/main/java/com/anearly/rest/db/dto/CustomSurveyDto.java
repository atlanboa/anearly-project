package com.anearly.rest.db.dto;

import java.util.List;

public class CustomSurveyDto {
	private String title;
	private String start_date;
	private String end_date;
	private String category;
	private String product_name;
	private int product_price;
	private String product_release_date;
	private String image;
	private int max_participant_number;
	private int cur_participant_number;
	private int point_per_participant;
	private String prodcut_image;
	private int age;
	private int gender;
	private String content;

	private List<CustomSurveyListDto> survey;

	public CustomSurveyDto(String title, String start_date, String end_date, String category, String product_name,
			int product_price, String product_release_date, String image, int max_participant_number,
			int cur_participant_number, int point_per_participant, String prodcut_image, int age, int gender,
			String content, List<CustomSurveyListDto> survey) {
		super();
		this.title = title;
		this.start_date = start_date;
		this.end_date = end_date;
		this.category = category;
		this.product_name = product_name;
		this.product_price = product_price;
		this.product_release_date = product_release_date;
		this.image = image;
		this.max_participant_number = max_participant_number;
		this.cur_participant_number = cur_participant_number;
		this.point_per_participant = point_per_participant;
		this.prodcut_image = prodcut_image;
		this.age = age;
		this.gender = gender;
		this.content = content;
		this.survey = survey;
	}

	public CustomSurveyDto(String title, String start_date, String end_date, String category, String product_name,
			int product_price, String product_release_date, String image, int max_participant_number,
			int cur_participant_number, int point_per_participant, String prodcut_image, int age, int gender,
			List<CustomSurveyListDto> survey) {
		super();
		this.title = title;
		this.start_date = start_date;
		this.end_date = end_date;
		this.category = category;
		this.product_name = product_name;
		this.product_price = product_price;
		this.product_release_date = product_release_date;
		this.image = image;
		this.max_participant_number = max_participant_number;
		this.cur_participant_number = cur_participant_number;
		this.point_per_participant = point_per_participant;
		this.prodcut_image = prodcut_image;
		this.age = age;
		this.gender = gender;
		this.survey = survey;
	}

	public CustomSurveyDto(String title, String start_date, String end_date, String category, String product_name,
			int product_price, String product_release_date, String image, int max_participant_number,
			int cur_participant_number, int point_per_participant, String prodcut_image,
			List<CustomSurveyListDto> survey) {
		super();
		this.title = title;
		this.start_date = start_date;
		this.end_date = end_date;
		this.category = category;
		this.product_name = product_name;
		this.product_price = product_price;
		this.product_release_date = product_release_date;
		this.image = image;
		this.max_participant_number = max_participant_number;
		this.cur_participant_number = cur_participant_number;
		this.point_per_participant = point_per_participant;
		this.prodcut_image = prodcut_image;
		this.survey = survey;
	}

	public CustomSurveyDto() {
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public int getGender() {
		return gender;
	}

	public void setGender(int gender) {
		this.gender = gender;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getStart_date() {
		return start_date;
	}

	public void setStart_date(String start_date) {
		this.start_date = start_date;
	}

	public String getEnd_date() {
		return end_date;
	}

	public void setEnd_date(String end_date) {
		this.end_date = end_date;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getProduct_name() {
		return product_name;
	}

	public void setProduct_name(String product_name) {
		this.product_name = product_name;
	}

	public int getProduct_price() {
		return product_price;
	}

	public void setProduct_price(int product_price) {
		this.product_price = product_price;
	}

	public String getProduct_release_date() {
		return product_release_date;
	}

	public void setProduct_release_date(String product_release_date) {
		this.product_release_date = product_release_date;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public int getMax_participant_number() {
		return max_participant_number;
	}

	public void setMax_participant_number(int max_participant_number) {
		this.max_participant_number = max_participant_number;
	}

	public int getCur_participant_number() {
		return cur_participant_number;
	}

	public void setCur_participant_number(int cur_participant_number) {
		this.cur_participant_number = cur_participant_number;
	}

	public int getPoint_per_participant() {
		return point_per_participant;
	}

	public void setPoint_per_participant(int point_per_participant) {
		this.point_per_participant = point_per_participant;
	}

	public String getProdcut_image() {
		return prodcut_image;
	}

	public void setProdcut_image(String prodcut_image) {
		this.prodcut_image = prodcut_image;
	}

	public List<CustomSurveyListDto> getSurvey() {
		return survey;
	}

	public void setSurvey(List<CustomSurveyListDto> survey) {
		this.survey = survey;
	}

	@Override
	public String toString() {
		return "CustomSurveyDto [title=" + title + ", start_date=" + start_date + ", end_date=" + end_date
				+ ", category=" + category + ", product_name=" + product_name + ", product_price=" + product_price
				+ ", product_release_date=" + product_release_date + ", image=" + image
				+ ", max_participant_number=" + max_participant_number + ", cur_participant_number="
				+ cur_participant_number + ", point_per_participant=" + point_per_participant + ", prodcut_image="
				+ prodcut_image + ", survey=" + survey + "]";
	}

}
