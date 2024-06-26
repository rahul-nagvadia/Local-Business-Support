import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/BuisnessCrudItem.css";
import Navbar from "./Navbar";
import videoBackground from "../Static/cruditem.mp4";
export default function BusinessCrudItems() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [per, setPer] = useState("");
  const [status, setStatus] = useState("Available"); // New state for status
  const [business, setBusiness] = useState("");
  const [items, setItems] = useState([]);
  const [businessName, setBusinessName] = useState("");
  const [selectedItemId, setSelectedItemId] = useState(null);
  const businessid = localStorage.getItem("businessid");
  const [city, setcity] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("image", image);
    formData.append("per", per);
    formData.append("status", status); // Append status
    formData.append("business", businessid);
    formData.append("bus_name",businessName);
    formData.append("city",city);
    console.log(formData);
    try {
      if (selectedItemId) {
        // Update existing item
        const response = await axios.put(
          `http://localhost:8080/items/${selectedItemId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Item updated successfully:", response.data);
      } else {
        // Add new item
        const response = await axios.post(
          "http://localhost:8080/items/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Item uploaded successfully:", response.data);
      }
      fetchItems(); // Fetch items again to update the list
      clearForm();
    } catch (error) {
      console.error("Error uploading/updating item:", error);
    }
  };

  const handleItemClick = (item) => {
    setSelectedItemId(item.itemId);
    setName(item.name);
    setPrice(item.price);
    setQuantity(item.quantity);
    setPer(item.per);
    setStatus(item.status); // Set status
    setBusiness(item.business);
  };

  const clearForm = () => {
    setSelectedItemId(null);
    setName("");
    setPrice("");
    setQuantity("");
    setPer("");
    setStatus("Available"); // Reset status
    setBusiness("");
    setImage(null);
  };

  
  const fetchItems = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/items/${businessid}/itemsofbusiness`
      );
      setItems(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };
  useEffect(() => {
    const fetchBusinessName = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/business/${businessid}`
        );
        setBusinessName(response.data.company);
        setcity(response.data.city);
      } catch (error) {
        console.error("Error fetching business name:", error);
      }
    };

    fetchItems();
    fetchBusinessName();
  }, [businessid]);

  return (
    <>
    <Navbar></Navbar>
    <div className="video-container-order">
          <video autoPlay loop muted className="video-bg-order">
            <source src={videoBackground} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
    <div className="container-b-items">
      <div className="form-container-b-items">
        <h1>Upload Item</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="price">Price:</label>
            <input
              type="text"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="text"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="per">Per:</label>
            <input
              type="text"
              id="per"
              value={per}
              onChange={(e) => setPer(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="status">Status:</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Available">Available</option>
              <option value="Not Available">Not Available</option>
            </select>
          </div>
          <div>
            <label htmlFor="image">Image:</label>
            <input
              type="file"
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <button type="submit">Upload</button>
        </form>
      </div>
      <div className="items-container-b-items">
        <h2>Items</h2>
        <div className="items-list-b-items">
          {items.map((item) => (
            <div key={item.itemId} className="item-b-items" onClick={() => handleItemClick(item)}>
              <img src={item.imageUrl} alt={item.name} />
              <div>
                <h3>{item.name}</h3>
                <p>Price: {item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Per: {item.per}</p>
                <p>Status: {item.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
