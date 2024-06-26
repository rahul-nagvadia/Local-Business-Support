package com.example.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Review_Business")
public class Review_Business {
	
	@Id
	private String rb_id;
	private String user;
	private String business;
	private int stars;
	private String review;
	
	
	public Review_Business(String user, String business, int stars, String review) {
		super();
		this.user = user;
		this.business = business;
		this.stars = stars;
		this.review = review;
	}
	
	
	public void setRb_id(String rb_id) {
		this.rb_id = rb_id;
	}
	public String getUser() {
		return user;
	}
	public void setUser(String user) {
		this.user = user;
	}
	public String getBusiness() {
		return business;
	}
	public void setBusiness(String business) {
		this.business = business;
	}
	public int getStars() {
		return stars;
	}
	public void setStars(int stars) {
		this.stars = stars;
	}
	public String getReview() {
		return review;
	}
	public void setReview(String review) {
		this.review = review;
	}
	
}
