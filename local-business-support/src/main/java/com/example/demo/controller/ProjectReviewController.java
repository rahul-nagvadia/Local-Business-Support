package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.model.ProjectReview;
import com.example.demo.repository.ReviewRepository;

@RestController
@RequestMapping("/review")
public class ProjectReviewController {
	
	@Autowired
    private ReviewRepository rvRepository;
	
	@PostMapping("/add-to-review")
    public ResponseEntity<String> addToCart(@RequestBody ProjectReview rv) {
		rvRepository.save(rv);
        return ResponseEntity.ok("Review added to cart successfully");
    }
	
	@GetMapping("/get-all-review")
    public List<ProjectReview> getAllBusiness() {
        return rvRepository.findAll();
    }
}
