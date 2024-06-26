package com.example.demo.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.State;
import com.example.demo.service.StateService;

@RestController
@RequestMapping("/state")
public class StateController {
	
	@Autowired
    private StateService stateService;

    @PostMapping("/add-state")
    public State addState(@RequestBody State stateRequest) {
    	State state = new State(stateRequest.getState_name());
        return stateService.addState(state);
    }

    @GetMapping("/get-all-state")
    public List<State> getAllState() {
        return stateService.getAllState();
    }

    @GetMapping("/{id}")
    public State getStateById(@PathVariable String id) {
        return stateService.getStateById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteState(@PathVariable String id) {
    	stateService.deleteState(id);
    }
}
