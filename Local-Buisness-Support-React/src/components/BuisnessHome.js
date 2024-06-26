import React, { useEffect } from 'react'
import axios from 'axios';
export default function BuisnessHome() {
  const token = localStorage.getItem("jwtBusinessToken");
  useEffect(() => {
    const fetchdata = async() =>{
      await axios.get(
        "http://localhost:8080/business/me",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send JWT token in the Authorization header
          },
        }
      );
    }
    fetchdata();
  },[token]);
  return (
    <div>
      Welcome Business Handler.
    </div>
  )
}
