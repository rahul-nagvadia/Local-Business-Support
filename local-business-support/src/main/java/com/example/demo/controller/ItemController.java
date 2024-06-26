package com.example.demo.controller;

import com.example.demo.model.Item;
import com.example.demo.model.Business;
import com.example.demo.model.Cart;
import com.example.demo.model.Category;
import com.example.demo.repository.CartRepository;
import com.example.demo.repository.ItemRepository;
import com.example.demo.service.CloudinaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/items")
public class ItemController {

    @Autowired
    private CloudinaryService cloudinaryService;

    @Autowired
    private ItemRepository itemRepository;
    

    @PostMapping("/upload")
    public Item uploadItem(@RequestParam("name") String name,
                           @RequestParam("price") double price,
                           @RequestParam("image") MultipartFile image,
                           @RequestParam("quantity") String quantity,
                           @RequestParam("status") String status,
                           @RequestParam("per") String per,
                           @RequestParam("bus_name") String businessName,
                           @RequestParam("city") String city,
                           @RequestParam("business") String business) throws IOException {
        Map uploadResult = cloudinaryService.uploadImage(image);
        String imageUrl = uploadResult.get("url").toString();

        // Create new Item
        Item item = new Item(name, price, imageUrl, business,quantity,status,per,businessName,city );
        
        // Save the Item to MongoDB
        item = itemRepository.save(item);

        return item;
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Item> updateItem(
            @PathVariable String id,
            @RequestParam("name") String name,
            @RequestParam("price") double price,
            @RequestParam("quantity") String quantity,
            @RequestParam("image") MultipartFile image,
            @RequestParam("per") String per,
            @RequestParam("status") String status,
            @RequestParam("business") String business) throws IOException {
        
        Optional<Item> optionalItem = itemRepository.findById(id);
        if (!optionalItem.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Item item = optionalItem.get();
        item.setName(name);
        item.setPrice(price);
        item.setQuantity(quantity);
        item.setPer(per);
        item.setStatus(status);
        item.setBusiness(business);
        Map uploadResult = cloudinaryService.uploadImage(image);
        String imageUrl = uploadResult.get("url").toString();
        if (image != null && !image.isEmpty()) {
            item.setImageUrl(imageUrl);
        }

        itemRepository.save(item);
        return ResponseEntity.ok(item);
    }
    
    @GetMapping("/{businessId}/itemsofbusiness")
    public List<Item> getItemsByBusinessId(@PathVariable String businessId) {
        return itemRepository.findByBusiness(businessId);
    }
    
    @GetMapping("/{itemId}")
    public ResponseEntity<Item> getItemById(@PathVariable String itemId) {
        return itemRepository.findById(itemId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @GetMapping("/get-all-items")
    public List<Item> getAllCategories() {
        return itemRepository.findAll();
    }
    @GetMapping("/search")
    public List<Item> searchItems(@RequestParam String query) {
        return itemRepository.findByNameContainingIgnoreCase(query);
    }
    
    @GetMapping("/byname/{itemName}")
    public ResponseEntity<List<Item>> getItemsByName(@PathVariable String itemName) {
        List<Item> items = itemRepository.findByNameIgnoreCase(itemName);
        if (items.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(items);
    }
    
    
}

