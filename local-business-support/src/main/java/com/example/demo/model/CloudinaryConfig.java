package com.example.demo.model;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Map;

@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary cloudinary() {
        Map<String, String> config = ObjectUtils.asMap(
            "cloud_name", "djehjybdv",
            "api_key", "928861923581613",
            "api_secret", "859S2NloT0xm_ia7vgZ_5O2m_no"
        );
        return new Cloudinary(config);
    }
}
