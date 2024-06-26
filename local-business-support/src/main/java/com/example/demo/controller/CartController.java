package com.example.demo.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Cart;
import com.example.demo.model.Item;
import com.example.demo.repository.CartRepository;
import com.example.demo.repository.ItemRepository;

@RestController
@RequestMapping("/cart")
public class CartController {
	
    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ItemRepository itemRepository;

    @PostMapping("/add-to-cart")
    public ResponseEntity<String> addToCart(@RequestBody Cart cartItem) {
        cartRepository.save(cartItem);
        return ResponseEntity.ok("Item added to cart successfully");
    }

    @PostMapping("/get-cart-by-user")
    public ResponseEntity<Map<String, Object>> getCartByUser(@RequestParam("user") String user) {
        Optional<List<Cart>> cartsOptional = cartRepository.findByUser(user);
        
        if (!cartsOptional.isPresent() || cartsOptional.get().isEmpty()) {
            // Handle the case where no cart is found for the user
            return ResponseEntity.notFound().build();
        }

        List<Cart> carts = cartsOptional.get();
        List<Item> allItems = new ArrayList<>();
        Map<String, String> allQuantities = new HashMap<>();

        for (Cart cart : carts) {
            Map<String, String> itemQuantities = cart.getItems();
            allQuantities.putAll(itemQuantities); // Merge quantities from all carts
            
            // Extract item IDs from the current cart
            List<String> itemIds = new ArrayList<>(itemQuantities.keySet());
            // Retrieve items from the database based on the item IDs
            List<Item> items = itemRepository.findByItemIdIn(itemIds);
            // Add retrieved items to the list of all items
            allItems.addAll(items);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("carts",carts);
        response.put("items", allItems);
        response.put("quantities", allQuantities);
        return ResponseEntity.ok(response);
    }

}
