import React, { useState, useEffect } from "react";
import axios from "axios";

const AddBusiness = () => {
  const [business, setBusiness] = useState({
    company: "",
    name: "",
    mobile_no: "",
    email: "",
    address: "",
    description: "",
    city: "",
    state: "",
    category: "",
    busmem: "",
    password: "",
  });

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const token = localStorage.getItem("jwtToken");
  useEffect(() => {
    
    const fetch = async () => {
      const currentUserResponse = await axios.get(
        "http://localhost:8080/business-mem/me",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send JWT token in the Authorization header
          },
        }
      );
      business.busmem = currentUserResponse.data.mem_id;
    };
    fetch();
  }, [token, business]);
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/state/get-all-state"
        );
        setStates(response.data); // Correctly set states
      } catch (error) {
        console.error("Error fetching states:", error);
        setStates([]); // Fallback to an empty array on error
      }
    };
    fetchStates();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/categories/get-all-cat"
        );
        setCategories(response.data); // Correctly set categories
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]); // Fallback to an empty array on error
      }
    };
    fetchCategories();
  }, []);

  const handleStateChange = async (state_name) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/city/citiesbystate",
        { state_name }
      );
      setCities(response.data);
    } catch (error) {
      console.error("Error fetching cities:", error);
      setCities([]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "state") {
      // If the state changes, clear the city selection
      setBusiness({ ...business, [name]: value, city: "" });
      handleStateChange(value);
    } else {
      setBusiness({ ...business, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/business/add-business", business);
      window.alert("Business created successfully!");
    } catch (error) {
      console.error("Error In adding Business:", error);
    } 
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Company:</label>
        <input
          type="text"
          name="company"
          value={business.company}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={business.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Mobile No:</label>
        <input
          type="text"
          name="mobile_no"
          value={business.mobile_no}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={business.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="text"
          name="password"
          value={business.password}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={business.address}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={business.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>State:</label>
        <select name="state" value={business.state} onChange={handleChange}>
          <option value="">Select a state</option>
          {states.map((state) => (
            <option key={state.state_id} value={state.state_name}>
              {state.state_name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>City:</label>
        <select
          name="city"
          value={business.city}
          onChange={handleChange}
          disabled={!business.state}
        >
          <option value="">Select a city</option>
          {cities.map((city) => (
            <option key={city.city_id} value={city.city_name}>
              {city.city_name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Category:</label>
        <select
          name="category"
          value={business.category}
          onChange={handleChange}
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddBusiness;
