package com.example.demo.model;

import java.util.Date;
import java.util.List;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Orders")
public class Order {
    @Id
    private String order_id;
    private List<Cart> carts;
    private Date order_date;
    private String user;
    private int res;

    // Constructor
    public Order(List<Cart> carts, Date order_date, int res, String user) {
        this.carts = carts;
        this.order_date = order_date;
        this.res = res;
        this.user = user;
    }

    // Getters and Setters
    public String getOrder_id() {
        return order_id;
    }

    public List<Cart> getCarts() {
        return carts;
    }

    public void setCarts(List<Cart> carts) {
        this.carts = carts;
    }

    public Date getOrder_date() {
        return order_date;
    }

    public void setOrder_date(Date order_date) {
        this.order_date = order_date;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public int getRes() {
        return res;
    }

    public void setRes(int res) {
        this.res = res;
    }
}
