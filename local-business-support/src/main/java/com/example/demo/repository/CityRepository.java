package com.example.demo.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.demo.model.City;

public interface CityRepository extends MongoRepository<City, String>{
	List<City> findByState(String state);
}
