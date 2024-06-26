package com.example.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "States")
public class State {
	@Id
	private String state_id;
	private String state_name;
	
	public State() {}
	public State(String state_name) {
		super();
		this.state_name = state_name;
	}

	public String getState_id() {
		return state_id;
	}

	public String getState_name() {
		return state_name;
	}

	public void setState_name(String state_name) {
		this.state_name = state_name;
	}
	
	
	
	
}
