import React, { useState } from "react";
import axios from "axios";

export default function AddCategory() {
  // Renamed to start with an uppercase letter
  const [name, setName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(name);
      const response = await axios.post(
        "http://localhost:8080/categories/add-category",
        { name }
      );
      console.log("Category added:", response.data);
      setName("");
    } catch (error) {
      console.error("There was an error adding the category!", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Category Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <button type="submit">Add Category</button>
    </form>
  );
}
