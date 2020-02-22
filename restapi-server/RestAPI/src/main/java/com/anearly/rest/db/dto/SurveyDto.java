package com.anearly.rest.db.dto;

public class SurveyDto {

	private int id;
	private int user_id;
	private String title;
	private String content;
	private int hit;
	private String start_date;
	private String end_date;
	private int budget;
	private String category;
	private String product_name;
	private int product_price;
	private String product_release_date;
	private String product_image;
	private int max_participant_number;
	private int cur_participant_number;
	private int point_per_participant;
	private int approval;
	private int open_status;
	private int target_age;
	private int target_gender;

	public SurveyDto(int id, int user_id, String title, String content, int hit, String start_date, String end_date,
			int budget, String category, String product_name, int product_price, String product_release_date,
			String product_image, int max_participant_number, int cur_participant_number, int point_per_participant,
			int approval, int open_status, int target_age, int target_gender) {
		super();
		this.id = id;
		this.user_id = user_id;
		this.title = title;
		this.content = content;
		this.hit = hit;
		this.start_date = start_date;
		this.end_date = end_date;
		this.budget = budget;
		this.category = category;
		this.product_name = product_name;
		this.product_price = product_price;
		this.product_release_date = product_release_date;
		this.product_image = product_image;
		this.max_participant_number = max_participant_number;
		this.cur_participant_number = cur_participant_number;
		this.point_per_participant = point_per_participant;
		this.approval = approval;
		this.open_status = open_status;
		this.target_age = target_age;
		this.target_gender = target_gender;
	}

	public SurveyDto(int id, int user_id, String title, String content, int hit, String start_date, String end_date,
			int budget, String category, String product_name, int product_price, String product_release_date,
			String product_image, int max_participant_number, int cur_participant_number, int point_per_participant,
			int approval, int open_status) {
		super();
		this.id = id;
		this.user_id = user_id;
		this.title = title;
		this.content = content;
		this.hit = hit;
		this.start_date = start_date;
		this.end_date = end_date;
		this.budget = budget;
		this.category = category;
		this.product_name = product_name;
		this.product_price = product_price;
		this.product_release_date = product_release_date;
		this.product_image = product_image;
		this.max_participant_number = max_participant_number;
		this.cur_participant_number = cur_participant_number;
		this.point_per_participant = point_per_participant;
		this.approval = approval;
		this.open_status = open_status;
	}

	public SurveyDto(int id, int user_id, String title, int hit, String start_date, String end_date, int budget,
			String category, String product_name, int product_price, String product_release_date, String product_image,
			int max_participant_number, int cur_participant_number, int point_per_participant, int approval,
			int open_status) {
		super();
		this.id = id;
		this.user_id = user_id;
		this.title = title;
		this.hit = hit;
		this.start_date = start_date;
		this.end_date = end_date;
		this.budget = budget;
		this.category = category;
		this.product_name = product_name;
		this.product_price = product_price;
		this.product_release_date = product_release_date;
		this.product_image = product_image;
		this.max_participant_number = max_participant_number;
		this.cur_participant_number = cur_participant_number;
		this.point_per_participant = point_per_participant;
		this.approval = approval;
		this.open_status = open_status;
	}

	public SurveyDto(int user_id, String title, String start_date, String end_date, int budget, String category,
			String product_name, int product_price, String product_release_date, String product_image,
			int max_participant_number, int point_per_participant) {
		super();
		this.user_id = user_id;
		this.title = title;
		this.start_date = start_date;
		this.end_date = end_date;
		this.budget = budget;
		this.category = category;
		this.product_name = product_name;
		this.product_price = product_price;
		this.product_release_date = product_release_date;
		this.product_image = product_image;
		this.max_participant_number = max_participant_number;
		this.point_per_participant = point_per_participant;
	}

	public SurveyDto() {
	}

	public int getTarget_age() {
		return target_age;
	}

	public void setTarget_age(int target_age) {
		this.target_age = target_age;
	}

	public int getTarget_gender() {
		return target_gender;
	}

	public void setTarget_gender(int target_gender) {
		this.target_gender = target_gender;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getUser_id() {
		return user_id;
	}

	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public int getHit() {
		return hit;
	}

	public void setHit(int hit) {
		this.hit = hit;
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

	public int getBudget() {
		return budget;
	}

	public void setBudget(int budget) {
		this.budget = budget;
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

	public String getProduct_image() {
		return product_image;
	}

	public void setProduct_image(String product_image) {
		this.product_image = product_image;
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

	public int getApproval() {
		return approval;
	}

	public void setApproval(int approval) {
		this.approval = approval;
	}

	public int getOpen_status() {
		return open_status;
	}

	public void setOpen_status(int open_status) {
		this.open_status = open_status;
	}

	@Override
	public String toString() {
		return "SurveyDto [id=" + id + ", user_id=" + user_id + ", title=" + title + ", hit=" + hit + ", start_date="
				+ start_date + ", end_date=" + end_date + ", budget=" + budget + ", category=" + category
				+ ", product_name=" + product_name + ", product_price=" + product_price + ", product_release_date="
				+ product_release_date + ", product_image=" + product_image + ", max_participant_number="
				+ max_participant_number + ", cur_participant_number=" + cur_participant_number
				+ ", point_per_participant=" + point_per_participant + ", approval=" + approval + ", open_status="
				+ open_status + "]";
	}

}
