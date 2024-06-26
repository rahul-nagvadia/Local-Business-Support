package com.example.demo.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.City;
import com.example.demo.model.State;
import com.example.demo.service.CityService;

@RestController
@RequestMapping("/city")
public class CityController {
	
	@Autowired
    private CityService cityService;

    @PostMapping("/add-city")
    public City addCity(@RequestBody City cityRequest) {
    	City city = new City(cityRequest.getCity_name(), cityRequest.getState());
        return cityService.addCity(city);
    }

    @GetMapping("/get-all-city")
    public List<City> getAllCity() {
        return cityService.getAllCity();
    }
    
    @PostMapping("/citiesbystate")
    public List<City> getCities(@RequestBody State state) {
        return cityService.findByState(state.getState_name());
    }

    @GetMapping("/{id}")
    public City getCityById(@PathVariable String id) {
        return cityService.getCityById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteCity(@PathVariable String id) {
    	cityService.deleteCity(id);
    }
}
