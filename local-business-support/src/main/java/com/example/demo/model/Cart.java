package com.example.demo.model;

import java.util.Map;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection ="Cart")
public class Cart {
	@Id
	private String cart_id;
	private String user;
	private Map<String, String> items;
	private String business;
	
	
	public Cart(String user, Map<String, String> items, String business) {
		super();
		this.user = user;
		this.items = items;
		this.business = business;
	}


	public String getBusiness() {
		return business;
	}


	public void setBusiness(String business) {
		this.business = business;
	}


	public String getCart_id() {
		return cart_id;
	}


	public String getUser() {
		return user;
	}


	public void setUser(String user) {
		this.user = user;
	}


	public Map<String, String> getItems() {
		return items;
	}


	public void setItems(Map<String, String> items) {
		this.items = items;
	}
	
	
}
