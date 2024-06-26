package com.example.demo.service;

import java.util.List;

import org.apache.el.stream.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.model.Business;
import com.example.demo.repository.BusinessRepository;

@Service
public class BusinessService {
	
	@Autowired
    private BusinessRepository businessRepository;

    public Business addbusiness(Business business) {
        return businessRepository.save(business);
    }

    public List<Business> getAllbusiness() {
        return businessRepository.findAll();
    }

    public Business getBusinessById(String id) {
        return businessRepository.findById(id).orElse(null);
    }

    public void deleteBusiness(String id) {
    	businessRepository.deleteById(id);
    }

	public List<Business> findByCity(String city) {
		return businessRepository.findByCity(city);
	}
	public List<Business> findByBusmem(String busmemId) {
        return businessRepository.findByBusmem(busmemId);
    }
	public Business updateBusiness(String id, Business updatedBusiness) {
        java.util.Optional<Business> existingBusinessOptional = businessRepository.findById(id);
        if (existingBusinessOptional.isPresent()) {
            Business existingBusiness = existingBusinessOptional.get();
            existingBusiness.setCompany(updatedBusiness.getCompany());
            existingBusiness.setName(updatedBusiness.getName());
            existingBusiness.setMobile_no(updatedBusiness.getMobile_no());
            existingBusiness.setEmail(updatedBusiness.getEmail());
            existingBusiness.setAddress(updatedBusiness.getAddress());
            existingBusiness.setDescription(updatedBusiness.getDescription());
            existingBusiness.setCity(updatedBusiness.getCity());
            existingBusiness.setState(updatedBusiness.getState());
            existingBusiness.setCategory(updatedBusiness.getCategory());
            existingBusiness.setBusmem(updatedBusiness.getBusmem());
            existingBusiness.setPassword(updatedBusiness.getPassword());
            return businessRepository.save(existingBusiness);
        } else {
            return null;
        }
    }
	public List<Business> findByCategory(String category) {
        return businessRepository.findByCategory(category);
    }

}
