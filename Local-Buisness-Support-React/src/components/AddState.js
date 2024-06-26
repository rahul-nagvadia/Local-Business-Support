import React, { useState } from "react";
import axios from "axios";

export default function AddState() {
    const [state_name , setname] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(state_name);
      const response = await axios.post(
        "http://localhost:8080/state/add-state",
        { state_name }
      ); // Corrected endpoint
      console.log("State added:", response.data);
      setname("");
    } catch (error) {
      console.error("There was an error adding the state!", error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        State Name:
        <input
          type="text"
          value={state_name}
          onChange={(e) => setname(e.target.value)}
        />
      </label>
      <button type="submit">Add State</button>
    </form>
  );
}
