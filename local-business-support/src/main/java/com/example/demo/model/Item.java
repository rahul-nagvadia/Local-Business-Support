package com.example.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;



@Document(collection = "items")
public class Item {
    @Id
    private String itemId;
    private String name;
    private double price;
    private String per;
    private String quantity;
    private String status;
    private String imageUrl;
    private String business;
    private String bus_name;
    private String city;
    // Constructor
    public Item(String name, double price, String imageUrl, String business, String quantity, String status, String per, String bus_name, String city) {
		super();
		this.name = name;
		this.price = price;
		this.imageUrl = imageUrl;
		this.business = business;
		this.quantity = quantity;
		this.status = status;
		this.per = per;
		this.bus_name = bus_name;
		this.city = city;
    }

	public String getBus_name() {
		return bus_name;
	}

	public void setBus_name(String bus_name) {
		this.bus_name = bus_name;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getPer() {
		return per;
	}

	public void setPer(String per) {
		this.per = per;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getQuantity() {
		return quantity;
	}

	public void setQuantity(String quantity) {
		this.quantity = quantity;
	}

	public String getBusiness() {
		return business;
	}

	public void setBusiness(String business) {
		this.business = business;
	}

	// Getters and setters
    public String getItemId() {
        return itemId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
