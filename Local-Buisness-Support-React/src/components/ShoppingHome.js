import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import videoBackground from "../Static/shop-new.mp4";
import "../Styles/ShoppingHome.css";
import axios from "axios";
import CategoryCard from "./CategoryCard";
import CitySearch from "./CitySearch";
import LoginForm from "./UserLogin";
import AddUserMember from "./UserRegistration";
import { useNavigate } from "react-router-dom";
export default function ShoppingHome() {
  const [categories, setCategory] = useState([]);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const navigate = useNavigate();
  const handleOpenRegisterForm = () => {
    setShowRegisterForm(true);
    setShowLoginForm(false);
  };

  const handleCloseRegisterForm = () => {
    setShowRegisterForm(false);
  };

  const handleOpenLoginForm = () => {
    setShowRegisterForm(false);
    setShowLoginForm(true);
  };

  const handleCloseLoginForm = () => {
    setShowLoginForm(false);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchCategory = async () => {
      try {
        const response = await axios.get("http://localhost:8080/categories/get-all-cat");
        setCategory(response.data);
      } catch (error) {
        console.error("There was an error fetching categories!", error);
      }
    };

    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:8080/items/get-all-items");
        setItems(response.data);
      } catch (error) {
        console.error("There was an error fetching items!", error);
      }
    };

    fetchCategory();
    fetchItems();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const results = items.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredItems(results);
    } else {
      setFilteredItems([]);
    }
  }, [searchQuery, items]);

  const handleCategoryClick = (category) => {
    const encodedCategory = encodeURIComponent(category);
    navigate(`/ShoppingHome/buisness-category/${encodedCategory }`);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value) {
      fetchSearchResults(e.target.value);
    } else {
      setSearchResults([]);
    }
  };

  const fetchSearchResults = async (query) => {
    try {
      const response = await axios.get(`http://localhost:8080/items/search?query=${query}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error("There was an error fetching search results!", error);
    }
  };

  const handleSearchSelect = (item) => {
    navigate(`/ShoppingHome/item/${item.name.toUpperCase()}`);
  };

  return (
    <>
      <Navbar />
      <div className="video-container-shop">
        <video autoPlay loop muted className="video-bg-shop">
          <source src={videoBackground} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="search-container">
          <div className="search-bar-row">
            <input
              type="text"
              name="text"
              placeholder="Search 'Products'"
              className="input-search"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button className="button-search">
              <span>
                <svg
                  viewBox="0 0 24 24"
                  height="24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.145 18.29c-5.042 0-9.145-4.102-9.145-9.145s4.103-9.145 9.145-9.145 9.145 4.103 9.145 9.145-4.102 9.145-9.145 9.145zm0-15.167c-3.321 0-6.022 2.702-6.022 6.022s2.702 6.022 6.022 6.022 6.023-2.702 6.023-6.022-2.702-6.022-6.023-6.022zm9.263 12.443c-.817 1.176-1.852 2.188-3.046 2.981l5.452 5.453 3.014-3.013-5.42-5.421z"></path>
                </svg>
              </span>
            </button>
          </div>
          {filteredItems.length > 0 && (
            <div className="search-results">
              {filteredItems.map((item, index) => (
                <div
                  key={index}
                  className="search-result-item"
                  onClick={() => handleSearchSelect(item)}
                >
                  {item.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="section-cat">
        <div className="CatHead">Categories</div>
        <div className="AllCategory">
          {Array.isArray(categories) &&
            categories.map((category) => (
              <CategoryCard
                key={category.id}
                name={category.name}
                onClick={() => handleCategoryClick(category.name)}
              />
            ))}
        </div>
      </div>
      <CitySearch />
      {showRegisterForm && (
        <AddUserMember
          onClose={handleCloseRegisterForm}
          onSignInClick={handleOpenLoginForm}
        />
      )}
      {showLoginForm && (
        <LoginForm
          onClose={handleCloseLoginForm}
          onSignUnClick={handleOpenRegisterForm}
        />
      )}
    </>
  );
}
