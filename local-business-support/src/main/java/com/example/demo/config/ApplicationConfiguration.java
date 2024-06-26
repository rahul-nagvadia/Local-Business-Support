package com.example.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.example.demo.model.Business;
import com.example.demo.model.BusinessMembers;
import com.example.demo.model.User;
import com.example.demo.repository.BusinessMemberRepository;
import com.example.demo.repository.BusinessRepository; // Import the second repository
import com.example.demo.repository.UserRepository;

@Configuration
public class ApplicationConfiguration {
    private final BusinessMemberRepository userRepository;
    private final BusinessRepository businessRepository; // Declare the second repository
    private final UserRepository buyerrepo;
    public ApplicationConfiguration(
            BusinessMemberRepository userRepository,
            BusinessRepository businessRepository, 
            UserRepository buyerrepo// Inject the second repository
    ) {
        this.userRepository = userRepository;
        this.businessRepository = businessRepository;
        this.buyerrepo = buyerrepo;// Initialize the second repository
    }

    @Bean
    UserDetailsService userDetailsService() {
        return username -> {
        	BusinessMembers user = userRepository.findByEmail(username)
                    .orElse(null); // Adjust accordingly if there's a different default value
            if (user != null) {
                return user;
            } else {
                Business businessMember = businessRepository.findByEmail(username)
                        .orElse(null);
                if(businessMember != null) {
                return businessMember;
                }
                else {
                	User buyer = buyerrepo.findByEmail(username)
                            .orElseThrow(() -> new UsernameNotFoundException("User not found"));
                    	return buyer;
                }
            }
        };
    }


    @Bean
    BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();

        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());

        return authProvider;
    }
}
