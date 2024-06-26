import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AddCity() {
  const [states, setStates] = useState([]);  // Initialize with an empty array
  const [selectedState, setSelectedState] = useState('');
  const [cityName, setCityName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Fetch the list of states when the component mounts
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await axios.get('http://localhost:8080/state/get-all-state');
        console.log(response);
        setStates(response.data);
        console.log(states)  // Ensure response.data is an array
      } catch (error) {
        console.error('Error fetching states:', error);
        setStates([]);  // Fallback to an empty array on error
      }
    };
    fetchStates();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/city/add-city', {
        city_name: cityName,
        state: selectedState
      });
      console.log('City added:', response.data);
      setCityName('');
      setSelectedState('');
    } catch (error) {
      console.error('There was an error adding the city!', error);
      setErrorMsg('Error adding the city. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Select State:
        <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
          <option value="">Select a state</option>
          {Array.isArray(states) && states.map((state) => (
            <option key={state.id} value={state.state_name}>
              {state.state_name}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        City Name:
        <input
          type="text"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Add City</button>
      {errorMsg && <p>{errorMsg}</p>}
    </form>
  );
}
