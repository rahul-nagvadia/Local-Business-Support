import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/CityShops.css";
import { Link } from "react-router-dom";

export default function CityShops({ city }) {
  const [businesses, setBusinesses] = useState([]);
  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/business/bussinesssbycity",
          { city: city }
        );
        setBusinesses(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching businesses:", error);
      }
    };
    fetchBusiness();
  }, [city]);

  return (
    <>
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
    </>
  );
}
