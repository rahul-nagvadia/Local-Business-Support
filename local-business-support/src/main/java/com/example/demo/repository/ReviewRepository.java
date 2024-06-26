package com.example.demo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.example.demo.model.ProjectReview;

@Repository
public interface ReviewRepository extends MongoRepository<ProjectReview, String> {

}
