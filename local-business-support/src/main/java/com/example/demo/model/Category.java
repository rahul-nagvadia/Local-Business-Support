package com.example.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection ="Category")
public class Category {
	@Id
	private String id;
	private String name;
	public Category() {}
	public Category(String name) {
		super();
	}
	public String getId() {
		return id;
	}


	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	
	
	
}
