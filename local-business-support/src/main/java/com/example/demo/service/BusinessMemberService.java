package com.example.demo.service;

import java.util.List;
//import java.util.Optional;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.model.BusinessMembers;
import com.example.demo.repository.BusinessMemberRepository;

@Service
public class BusinessMemberService {
	
	@Autowired
    private BusinessMemberRepository businessMemberRepository;

    public BusinessMembers addbusinessMember(BusinessMembers business) {
        return businessMemberRepository.save(business);
    }

    public List<BusinessMembers> getAllbusinessMember() {
        return businessMemberRepository.findAll();
    }

    public BusinessMembers getBusinessMemberById(String id) {
        return businessMemberRepository.findById(id).orElse(null);
    }

    public void deleteBusinessMember(String id) {
    	businessMemberRepository.deleteById(id);
    }
    
//    public BusinessMembers login(String username, String password) {
//        Optional<BusinessMembers> memberOpt = businessMemberRepository.findByUsernameAndPassword(username, password);
//        return memberOpt.orElse(null); // Return null or throw an exception if not found
//    }
    
//    public BusinessMembers authenticate(String username, String password) {
//        Optional<BusinessMembers> member = businessMemberRepository.findByUsername(username);
//        if (member != null && member.getPassword().equals(password)) {
//            return member;
//        }
//        return null;
//    }
}
