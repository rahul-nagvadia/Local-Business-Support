import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AddItem() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [per, setPer] = useState("");
  const [business, setBusiness] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("image", image);
    formData.append("per", per);
    formData.append("business", business);

    try {
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
    } catch (error) {
      console.error("Error uploading item:", error);
    }
  };

  const token = localStorage.getItem("jwtBusinessToken");
  useEffect(() => {
    const fetchData = async () => {
      const currentUserResponse = await axios.get(
        "http://localhost:8080/business/me",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send JWT token in the Authorization header
          },
        }
      );
      setBusiness(currentUserResponse.data.business_id);
      console.log(currentUserResponse);
    };
    fetchData();
  }, [token]);

  return (
    <div>
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
  );
}
