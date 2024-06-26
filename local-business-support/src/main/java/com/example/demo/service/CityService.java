package com.example.demo.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.model.City;
import com.example.demo.repository.CityRepository;

@Service
public class CityService {
	
	@Autowired
    private CityRepository cityRepository;

    public City addCity(City city) {
        return cityRepository.save(city);
    }

    public List<City> getAllCity() {
        return cityRepository.findAll();
    }

    public City getCityById(String id) {
        return cityRepository.findById(id).orElse(null);
    }

    public void deleteCity(String id) {
    	cityRepository.deleteById(id);
    }
    
    public List<City> findByState(String state) {
        return cityRepository.findByState(state);
    }
}
