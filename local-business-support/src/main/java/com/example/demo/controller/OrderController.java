package com.example.demo.controller;

import com.example.demo.model.Cart;
import com.example.demo.model.Order;
import com.example.demo.repository.CartRepository;
import com.example.demo.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/order")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private CartRepository cartRepository;

    @PostMapping("/create")
    public List<Order> createOrder(@RequestBody List<Cart> carts, @RequestParam String user) {
        // Grouping carts by business
        Map<String, List<Cart>> cartsGroupedByBusiness = new HashMap<>();
        for (Cart cart : carts) {
            cartsGroupedByBusiness
                .computeIfAbsent(cart.getBusiness(), k -> new ArrayList<>())
                .add(cart);
        }

        // Create orders for each business group
        List<Order> orders = new ArrayList<>();
        for (Map.Entry<String, List<Cart>> entry : cartsGroupedByBusiness.entrySet()) {
            Map<String, String> combinedItems = new HashMap<>();
            for (Cart cart : entry.getValue()) {
                combinedItems.putAll(cart.getItems());
            }
            List<Cart> businessCarts = new ArrayList<>();
            businessCarts.add(new Cart(user, combinedItems, entry.getKey()));
            Order order = new Order(businessCarts, new Date(), 1, user);
            orders.add(orderRepository.save(order));
        }
        cartRepository.deleteByUser(user);
        return orders;
    }
    @PostMapping("/get-orders-by-user")
    public List<Order> getOrdersByUser(@RequestParam("user") String user) {
    	 return orderRepository.findByUser(user);
    }
    
    @PostMapping("/get-orders-by-business")
    public List<Order> getOrdersByBusiness(@RequestParam("businessId") String businessId) {
        List<Order> orders = orderRepository.findAll();
        List<Order> ordersByBusiness = new ArrayList<>();

        for (Order order : orders) {
            for (Cart cart : order.getCarts()) {
                if (cart.getBusiness().equals(businessId)) {
                    ordersByBusiness.add(order);
                    break;
                }
            }
        }

        return ordersByBusiness;
    }
    
    @PostMapping("/get-orders-by-businessactive")
    public List<Order> getOrdersByBusinessAndStatus(@RequestParam("businessId") String businessId, @RequestParam("res") int res) {
        return orderRepository.findByCartsBusinessAndRes(businessId, res);
    }
    
    @PostMapping("/update-status")
    public ResponseEntity<String> updateOrderStatus(@RequestParam("order_id") String order_id, @RequestParam("res") int res) {
    	System.out.print("Ofc i am destroyer");
        Optional<Order> optionalOrder = orderRepository.findById(order_id);
        if (optionalOrder.isPresent()) {
            Order order = optionalOrder.get();
            order.setRes(res);
            orderRepository.save(order);
            return ResponseEntity.ok("Order status updated successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Order not found");
        }
    }

}
