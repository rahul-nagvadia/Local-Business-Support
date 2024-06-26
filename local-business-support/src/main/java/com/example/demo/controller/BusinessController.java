package com.example.demo.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dtos.LoginResponse;
import com.example.demo.dtos.LoginUserDto;
import com.example.demo.model.Business;
import com.example.demo.model.City;
import com.example.demo.model.State;
import com.example.demo.model.User;
import com.example.demo.service.AuthenticationService;
import com.example.demo.service.BusinessService;
import com.example.demo.service.JwtService;

@RestController
@RequestMapping("/business")
public class BusinessController {
	
	@Autowired
    private BusinessService businessService;
	private final JwtService jwtService;

	private final AuthenticationService authenticationService;

	public BusinessController(JwtService jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }
    @PostMapping("/add-business")
    public ResponseEntity<Object> addBusiness(@RequestBody Business businessRequest) {

    	Business business = authenticationService.Businesssignup(businessRequest);
	    
	    if (business == null) {
	        return ResponseEntity.status(400).build();
	    	
	    } else {
	        return ResponseEntity.ok(business);
	    }
    }
    
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginUserDto loginUserDto){
		Business authenticatedUser = authenticationService.authenticateBusiness(loginUserDto);
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
        	Business currentUser = (Business) authentication.getPrincipal();
            return ResponseEntity.ok(currentUser);
        }
    }
    
    @GetMapping("/get-all-business")
    public List<Business> getAllBusiness() {
        return businessService.getAllbusiness();
    }
    
    @PostMapping("/bussinesssbycity")
    public List<Business> getCities(@RequestBody Map<String, String> payload) {
        String city = payload.get("city");
        return businessService.findByCity(city);
    }
    @GetMapping("/busmem/{busmemId}")
    public List<Business> getBusinessesByBusmem(@PathVariable String busmemId) {
        return businessService.findByBusmem(busmemId);
    }
    @GetMapping("/{id}")
    public Business getBusinessById(@PathVariable String id) {
        return businessService.getBusinessById(id);
    }
    
    @PostMapping("/businesses-by-category")
    public List<Business> getBusinessesByCategory(@RequestBody Map<String, String> payload) {
        String category = payload.get("category");
        return businessService.findByCategory(category);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Business> updateBusiness(@PathVariable String id, @RequestBody Business updatedBusiness) {
        Business business = businessService.updateBusiness(id, updatedBusiness);
        if (business == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } else {
            return ResponseEntity.ok(business);
        }
    }
    
    @DeleteMapping("/{id}")
    public void deleteBusiness(@PathVariable String id) {
    	businessService.deleteBusiness(id);
    }
}
