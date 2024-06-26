package com.example.demo.dtos;

public class LoginResponse {
    private String token;

    private long expiresIn;

    public String getToken() {
        return token;
    }

	public long getExpiresIn() {
		return expiresIn;
	}

	public LoginResponse(String token, long expiresIn) {
		super();
		this.token = token;
		this.expiresIn = expiresIn;
	}

	public void setExpiresIn(long expiresIn) {
		this.expiresIn = expiresIn;
	}

	public void setToken(String token) {
		this.token = token;
	}

 // Getters and setters...
}
