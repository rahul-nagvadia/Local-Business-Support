package com.example.demo.model;

import org.springframework.context.annotation.Configuration;
import org.springframework.session.data.mongo.config.annotation.web.http.EnableMongoHttpSession;

@Configuration
@EnableMongoHttpSession
public class HttpSessionConfig {
    // You can customize session settings here if needed
}
