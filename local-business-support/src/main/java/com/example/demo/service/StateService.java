package com.example.demo.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.model.State;
import com.example.demo.repository.StateRepository;

@Service
public class StateService {
	
	@Autowired
    private StateRepository stateRepository;

    public State addState(State category) {
        return stateRepository.save(category);
    }

    public List<State> getAllState() {
        return stateRepository.findAll();
    }

    public State getStateById(String id) {
        return stateRepository.findById(id).orElse(null);
    }

    public void deleteState(String id) {
    	stateRepository.deleteById(id);
    }
}
