package com.example.demo.repository;

import com.example.demo.model.Cart;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends MongoRepository<Cart, String> {

	Optional<List<Cart>> findByUser(String user);
	void deleteByUser(String user);
}