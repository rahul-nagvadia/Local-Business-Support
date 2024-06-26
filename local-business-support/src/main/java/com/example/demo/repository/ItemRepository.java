package com.example.demo.repository;
import com.example.demo.model.Item;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository extends MongoRepository<Item, String> {

	List<Item> findByBusiness(String businessId);
	List<Item> findByItemIdIn(List<String> itemIds);
	List<Item> findByNameContainingIgnoreCase(String query);
	List<Item> findByNameIgnoreCase(String itemName);
}