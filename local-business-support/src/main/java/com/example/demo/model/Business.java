package com.example.demo.model;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Document(collection = "businesses")
public class Business implements Serializable, UserDetails {
	private static final long serialVersionUID = 1L;
	@Id
    private String business_id;
	private String company;
	private String name;
	private Number mobile_no;
	private String email;
    private String address;
    private String description;
    private String city;
    private String state;
    private String category;
    private String password;
    private String busmem;
    
    
    public Business() {}
	
	public Business(String company, String name, Number mobile_no, String email, String address, String description,
			String city, String state, String category, String password, String busmem) {
		super();
		this.company = company;
		this.name = name;
		this.mobile_no = mobile_no;
		this.email = email;
		this.address = address;
		this.description = description;
		this.city = city;
		this.state = state;
		this.category = category;
		this.password = password;
		this.busmem = busmem;
	}
	
	public String getBusmem() {
		return busmem;
	}
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public void setBusmem(String busmem) {
		this.busmem = busmem;
	}
	public String getid() {
		return business_id;
	}
	public String getCompany() {
		return company;
	}
	public void setCompany(String company) {
		this.company = company;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Number getMobile_no() {
		return mobile_no;
	}
	public void setMobile_no(Number mobile_no) {
		this.mobile_no = mobile_no;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }
	@Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
    
    
}

