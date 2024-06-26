package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.demo.model.BusinessMembers;

public interface BusinessMemberRepository extends MongoRepository<BusinessMembers, String>{
	Optional<BusinessMembers> findByUsernameAndPassword(String username, String password);
	Optional<BusinessMembers> findByUsername(String username);
	Optional<BusinessMembers> findByEmail(String email);
}