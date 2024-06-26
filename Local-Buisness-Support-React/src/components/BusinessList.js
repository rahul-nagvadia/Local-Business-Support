import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CitySearch from "./CitySearch";
import Navbar from "./Navbar";
import videoBackground from "../Static/items.mp4";
import "../Styles/BusinessList.css";
import { Link } from "react-router-dom";

export default function BusinessList() {
  const { categoryName } = useParams();
  const [businesses, setBusinesses] = useState([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/business/businesses-by-category",
          { category: categoryName }
        );
        setBusinesses(response.data);
        setFilteredBusinesses(response.data);
      } catch (error) {
        console.error("Error fetching businesses:", error);
      }
    };

    fetchBusinesses();
  }, [categoryName]);

  const handleCityChange = (city) => {
    setSelectedCity(city);
    if (city === "") {
      setFilteredBusinesses(businesses);
    } else {
      const filtered = businesses.filter((business) => business.city === city);
      setFilteredBusinesses(filtered);
    }
  };

  return (
    <>
      <Navbar></Navbar>
      <video autoPlay loop muted className="video-bg-shop">
        <source src={videoBackground} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="overlay"></div>
      <div className="business-list-container">
        <h1 className="business-cat">Businesses in {categoryName}</h1>
        <div className="shops-cat">
          {businesses.map((business, index) => (
            <div key={index} className="card-city-shop">
              <div className="image-city-shop"></div>
              <div className="content-city-shop">
                <a href="#">
                  <span className="title-city-shop">{business.company}</span>
                </a>
                <p className="desc-city-shop">Category : {business.category}</p>
                <p className="desc-city-shop">{business.description}</p>

                <Link
                  className="action-city-shop"
                  to={`/ShoppingHome/business/${business.id}/items`}
                >
                  Go to Shop
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
