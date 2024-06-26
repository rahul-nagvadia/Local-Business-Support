import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/BusinessCrud.css";
import Navbar from "./Navbar";
import videoBackground from "../Static/business.mp4";
export default function BusinessCrudItems() {
  const [business, setBusiness] = useState({
    id: "",
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
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusinessId, setSelectedBusinessId] = useState(null);
  const busmem_id = localStorage.getItem("businessmanid");
  business.busmem = busmem_id;
  console.log(busmem_id);
  useEffect(() => {
    console.log(busmem_id);
    const fetchBusinesses = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/business/busmem/${busmem_id}`);
        console.log(response.data);
        setBusinesses(response.data);
      } catch (error) {
        console.error("Error fetching businesses:", error);
      }
    };
    fetchBusinesses();
  }, [busmem_id]);
 
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await axios.get("http://localhost:8080/state/get-all-state");
        setStates(response.data);
      } catch (error) {
        console.error("Error fetching states:", error);
        setStates([]);
      }
    };
    fetchStates();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8080/categories/get-all-cat");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  const handleStateChange = async (state_name) => {
    try {
      const response = await axios.post("http://localhost:8080/city/citiesbystate", { state_name });
      setCities(response.data);
    } catch (error) {
      console.error("Error fetching cities:", error);
      setCities([]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "state") {
      setBusiness((prevBusiness) => ({
        ...prevBusiness,
        [name]: value,
        city: "",
      }));
      handleStateChange(value);
    } else {
      setBusiness((prevBusiness) => ({
        ...prevBusiness,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedBusinessId) {
        await axios.put(`http://localhost:8080/business/${selectedBusinessId}`, business);
        console.log("Business updated successfully");
      } else {
        await axios.post("http://localhost:8080/business/add-business", business);
        console.log("Business created successfully");
      }
      fetchBusinesses();
      clearForm();
    } catch (error) {
      console.error("Error adding/updating business:", error);
    }
  };

  const handleBusinessClick = (business) => {
    setSelectedBusinessId(business.id);
    setBusiness({
      company: business.company,
      name: business.name,
      mobile_no: business.mobile_no,
      email: business.email,
      address: business.address,
      description: business.description,
      city: business.city,
      state: business.state,
      category: business.category,
      busmem: business.busmem,
      password: business.password,
    });
  };

  const clearForm = () => {
    setSelectedBusinessId(null);
    setBusiness({
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
  };

  const fetchBusinesses = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/business/busmem/${busmem_id}`);
      setBusinesses(response.data);
    } catch (error) {
      console.error("Error fetching businesses:", error);
    }
  };

  

  return (
    <>
    <Navbar/>
      <div className="video-container-business">
        <video autoPlay loop muted className="video-bg-business">
          <source src={videoBackground} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      
    <div className="container-b-items">
      <div className="form-container-b-items">
        <h1>Upload Business</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="company">Company:</label>
            <input
              type="text"
              name="company"
              value={business.company}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              value={business.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="mobile_no">Mobile No:</label>
            <input
              type="text"
              name="mobile_no"
              value={business.mobile_no}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              value={business.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email">Password:</label>
            <input
              type="text"
              name="password"
              value={business.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              name="address"
              value={business.address}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea
              name="description"
              value={business.description}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="state">State:</label>
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
            <label htmlFor="city">City:</label>
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
            <label htmlFor="category">Category:</label>
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
      </div>
      <div className="items-container-b-items">
        <h2>Businesses</h2>
        <div className="items-list-b-items">
          {businesses.map((business) => (
            <div
              key={business.id}
              className="item-b-items"
              onClick={() => handleBusinessClick(business)}
            >
              <div>
                <h3>{business.company}</h3>
                <p>Name: {business.name}</p>
                <p>Mobile: {business.mobile_no}</p>
                <p>Email: {business.email}</p>
                <p>Address: {business.address}</p>
                <p>Description: {business.description}</p>
                <p>City: {business.city}</p>
                <p>State: {business.state}</p>
                <p>Category: {business.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
    </>
  );
}
