package com.example.demo.service;

import com.example.demo.repository.BusinessMemberRepository;
import com.example.demo.repository.BusinessRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.dtos.LoginUserDto;
import com.example.demo.model.Business;
import com.example.demo.model.BusinessMembers;
import com.example.demo.model.User;

import java.util.Optional;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
	private final BusinessMemberRepository userRepository;
	private final BusinessRepository businessRepository;
	private final UserRepository buyerrepo;
	private final PasswordEncoder passwordEncoder;

	private final AuthenticationManager authenticationManager;

	public AuthenticationService(BusinessMemberRepository userRepository, AuthenticationManager authenticationManager,
			PasswordEncoder passwordEncoder, BusinessRepository businessRepository,UserRepository buyerrepo) {
		this.businessRepository = businessRepository;
		this.authenticationManager = authenticationManager;
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
		this.buyerrepo = buyerrepo;
	}

	public BusinessMembers signup(BusinessMembers businessRequest) {
		Optional<BusinessMembers> mem = userRepository.findByEmail(businessRequest.getEmail());
		Optional<BusinessMembers> mem2 = userRepository.findByUsername(businessRequest.getusernamenormal());
		if (mem.isPresent()) {
			return null;
		}
		if (mem2.isPresent()) {
			return null;
		}
		businessRequest.setPassword(passwordEncoder.encode(businessRequest.getPassword()));
		return userRepository.save(businessRequest);
	}

	public Business Businesssignup(Business businessRequest) {
		Optional<Business> mem = businessRepository.findByEmail(businessRequest.getEmail());
		if (mem.isPresent()) {
			return null;
		}
		businessRequest.setPassword(passwordEncoder.encode(businessRequest.getPassword()));
		return businessRepository.save(businessRequest);
	}

	public User Usersignup(User userRequest) {
		Optional<User> mem = buyerrepo.findByEmail(userRequest.getEmail());
		if (mem.isPresent()) {
			return null;
		}
		userRequest.setPassword(passwordEncoder.encode(userRequest.getPassword()));
		return buyerrepo.save(userRequest);
	}

	public BusinessMembers authenticate(LoginUserDto input) {

		authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(input.getEmail(), input.getPassword()));

		return userRepository.findByEmail(input.getEmail()).orElseThrow();
	}

	public Business authenticateBusiness(LoginUserDto input) {

		authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(input.getEmail(), input.getPassword()));
		return businessRepository.findByEmail(input.getEmail()).orElseThrow();
	}

	public User authenticateUser(LoginUserDto input) {
		authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(input.getEmail(), input.getPassword()));
		return buyerrepo.findByEmail(input.getEmail()).orElseThrow();
	}
}
