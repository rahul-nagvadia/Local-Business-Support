package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.demo.model.Business;

public interface BusinessRepository extends MongoRepository<Business, String>{
	Optional<Business> findByUsernameAndPassword(String username, String password);
	Optional<Business> findByEmail(String email);
	Optional<Business> findByUsername(String username);
	List<Business> findByCity(String city);
	List<Business> findByBusmem(String busmemId);
	List<Business> findByCategory(String category);
}

