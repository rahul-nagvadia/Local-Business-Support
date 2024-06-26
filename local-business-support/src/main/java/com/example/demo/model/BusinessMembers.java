package com.example.demo.model;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Document(collection = "BusinessMembers")
public class BusinessMembers implements Serializable, UserDetails{
	private static final long serialVersionUID = 1L;
	@Id
	private String mem_id;
	private String username;
	private String password;
	private String email;
	private String mobile_no;
	
	public BusinessMembers()
	{}	
		public BusinessMembers(String username, String password, String email, String mobile_no) {
		super();
		this.username = username;
		this.password = password;
		this.email = email;
		this.mobile_no = mobile_no;
	}
	
	public String getMem_id() {
		return mem_id;
	}
	public String getusernamenormal() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public BusinessMembers setPassword(String password) {
	    this.password = password;
	    return this;
	}
	public String getEmail() {
		return email;
	}
	public BusinessMembers setEmail(String email) {
	    this.email = email;
	    return this;
	}

	public String getMobile_no() {
		return mobile_no;
	}
	public void setMobile_no(String mobile_no) {
		this.mobile_no = mobile_no;
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
