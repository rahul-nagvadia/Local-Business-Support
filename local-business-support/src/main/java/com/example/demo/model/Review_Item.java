package com.example.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Review_Item")
public class Review_Item {
	@Id
	private String ri_id;
	private String user;
	private String item;
	private int stars;
	private String review;
	
	
	
	public Review_Item(String user, String item, int stars, String review) {
		super();
		this.user = user;
		this.item = item;
		this.stars = stars;
		this.review = review;
	}



	public String getRi_id() {
		return ri_id;
	}



	public String getUser() {
		return user;
	}



	public void setUser(String user) {
		this.user = user;
	}



	public String getItem() {
		return item;
	}



	public void setItem(String item) {
		this.item = item;
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
