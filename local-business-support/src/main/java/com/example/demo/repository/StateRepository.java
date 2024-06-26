package com.example.demo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.demo.model.State;

public interface StateRepository extends MongoRepository<State, String>{
}
