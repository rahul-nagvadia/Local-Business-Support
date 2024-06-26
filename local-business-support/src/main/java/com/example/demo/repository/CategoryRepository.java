package com.example.demo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.demo.model.Category;

public interface CategoryRepository extends MongoRepository<Category, String> {
}
