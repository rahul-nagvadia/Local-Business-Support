package com.example.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "ProjectReview")
public class ProjectReview {
	@Id
	private String prid;
	private String name;
	private String review;
	private String user_id;
	
	public ProjectReview(String name, String review, String user_id) {
		super();
		this.name = name;
		this.review = review;
		this.user_id = user_id;
	}

	public String getPrid() {
		return prid;
	}

	public void setPrid(String prid) {
		this.prid = prid;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getReview() {
		return review;
	}

	public void setReview(String review) {
		this.review = review;
	}

	public String getUser_id() {
		return user_id;
	}
	
	
	
}
