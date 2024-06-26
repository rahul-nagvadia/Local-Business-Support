package com.example.demo.service;

import com.example.demo.model.Cart;
import com.example.demo.model.User;
import com.example.demo.repository.CartRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CartRepository cartRepository;

    public User createUser(String firstName, String lastName, String username, String password, String mobileNo, String email, String address) {
        User user = new User(firstName, lastName, username, password, mobileNo, email, address);
        user = userRepository.save(user);

        return user;
    }

}
