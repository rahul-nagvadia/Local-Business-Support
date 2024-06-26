package com.example.demo.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.Authentication;
import com.example.demo.dtos.LoginResponse;
import com.example.demo.dtos.LoginUserDto;
import com.example.demo.model.BusinessMembers;
import com.example.demo.model.User;
import com.example.demo.service.AuthenticationService;
import com.example.demo.service.BusinessMemberService;
import com.example.demo.service.JwtService;
import org.springframework.security.core.context.SecurityContextHolder;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/business-mem")
public class BusinessMemberController {

	@Autowired
	private BusinessMemberService businessMemberService;
	private final JwtService jwtService;

	private final AuthenticationService authenticationService;

	public BusinessMemberController(JwtService jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

	@PostMapping("/add-business-mem")
	public ResponseEntity<BusinessMembers> addBusinessMember(@RequestBody BusinessMembers businessRequest) {
	    BusinessMembers businessMember = authenticationService.signup(businessRequest);
	    
	    if (businessMember == null) {
	        return ResponseEntity.status(400).build();
	    	
	    } else {
	        return ResponseEntity.ok(businessMember);
	    }
	}
	
	@PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginUserDto loginUserDto) {
		BusinessMembers authenticatedUser = authenticationService.authenticate(loginUserDto);
        String jwtToken = jwtService.generateToken(authenticatedUser);
        LoginResponse loginResponse = new LoginResponse(jwtToken,jwtService.getExpirationTime());
        return ResponseEntity.ok(loginResponse);
    }
	@GetMapping("/me")
	public ResponseEntity<?> authenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication.getPrincipal() instanceof String) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No user logged in.");
        } else {
        	BusinessMembers currentUser = (BusinessMembers) authentication.getPrincipal();
            return ResponseEntity.ok(currentUser);
        }
    }
	
	@GetMapping("/get-all-business-mem")
	public List<BusinessMembers> getAllBusinessMember() {
		return businessMemberService.getAllbusinessMember();
	}
	
//    @PostMapping("/login")
//    public String login(@RequestParam String username, @RequestParam String password, HttpSession session) {
//        BusinessMembers member = businessMemberService.login(username, password);
//        if (member != null) {
//            session.setAttribute("user", member);
//            return "Login successful";
//        } else {
//            return "Invalid credentials";
//        }
//    }
//
//    @GetMapping("/logout")
//    public String logout(HttpSession session) {
//        session.invalidate();
//        return "Logged out";
//    }
//
//    @GetMapping("/current-user")
//    public BusinessMembers getCurrentUser(HttpSession session) {
//        return (BusinessMembers) session.getAttribute("user");
//    }

//    @PostMapping("/login")
//    public String login(@RequestBody BusinessMembers businessRequest, HttpSession session) {
//    	System.out.println(businessRequest.getUsername());
//    	System.out.println(businessRequest.getPassword());
//        BusinessMembers authenticatedMember = businessMemberService.authenticate(businessRequest.getUsername(), businessRequest.getPassword());
//        
//        if (authenticatedMember != null) {
//        	
//            session.setAttribute("loggedInUser", authenticatedMember);
//            System.out.println(session.getAttribute("loggedInUser") + "Hello");
//            return "Login successful!";
//        } else {
//            return "Invalid credentials!";
//        }
//    }
//
//    @GetMapping("/current")
//    public BusinessMembers getCurrentUser(HttpSession session) {
//    	System.out.println((BusinessMembers) session.getAttribute("loggedInUser"));
//        return (BusinessMembers) session.getAttribute("loggedInUser");
//    }

	@GetMapping("/{id}")
	public BusinessMembers getBusinessMemberById(@PathVariable String id) {
		return businessMemberService.getBusinessMemberById(id);
	}

	@DeleteMapping("/{id}")
	public void deleteBusinessMember(@PathVariable String id) {
		businessMemberService.deleteBusinessMember(id);
	}

}
