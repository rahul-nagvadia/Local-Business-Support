package com.example.demo.controller;

import com.example.demo.dtos.LoginResponse;
import com.example.demo.dtos.LoginUserDto;
import com.example.demo.model.Business;
import com.example.demo.model.User;
import com.example.demo.service.AuthenticationService;
import com.example.demo.service.JwtService;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;
    private final JwtService jwtService;

	private final AuthenticationService authenticationService;

	public UserController(JwtService jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }
    @PostMapping("/add-user")
    public ResponseEntity<User> createUser(@RequestBody User userRequest) {
    	User user = authenticationService.Usersignup(userRequest);
	    
	    if (user == null) {
	        return ResponseEntity.status(400).build();
	    	
	    } else {
	        return ResponseEntity.ok(user);
	    }
    }
    
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginUserDto loginUserDto) {
		User authenticatedUser = authenticationService.authenticateUser(loginUserDto);
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
            User currentUser = (User) authentication.getPrincipal();
            return ResponseEntity.ok(currentUser);
        }
    }


}
