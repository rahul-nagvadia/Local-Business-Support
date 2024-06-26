import React, { useEffect, useState } from "react";
import "../Styles/CitySearch.css";
import axios from "axios";
import CityShops from "./CityShops";
import videoBackground from "../Static/dukane.mp4";

export default function CitySearch() {
  const [city, setSelectedCities] = useState("Select City");
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/city/get-all-city"
        );
        setCities(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching cities:", error);
        setCities([]);
      }
    };
    fetchCities();
  }, []);

  const handleChange = (event) => {
    setSelectedCities(event.target.value);
  };

  return (
    <div className="video-container-shop-dukane">
      <video autoPlay loop muted className="video-bg-shop-dukane">
        <source src={videoBackground} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="CitySearch">
        <label className="country-select-label">Find Shop Near You!!</label>
        <div className="custom-dropdown">
          <select
            id="country-select-search"
            value={city}
            onChange={handleChange}
            className="custom-select"
          >
            <option value="Select City" disabled>
              Select the City
            </option>
            {cities.map((city) => (
              <option key={city.city_id} value={city.city_name} className="city-options">
                {city.city_name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="shops">
        <CityShops city={city}></CityShops>
      </div>
    </div>
  );
}
