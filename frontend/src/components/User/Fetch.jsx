import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Fetch() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const sortedCountries = response.data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        setCountries(sortedCountries);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []); // Empty dependency array ensures the effect runs once on mount

  const fetchDistricts = async (countryCode) => {
    try {
      // You need to replace this URL with an appropriate API that provides district information
      const response = await axios.get(`https://api.example.com/districts/${countryCode}`);
      console.log(response.data); // Handle the district data as needed
    } catch (error) {
      console.error('Error fetching districts:', error);
    }
  };

  return (
    <div>
      <h2>Country List</h2>
      <ul>
        {countries.map(country => (
          <li key={country.cca3}>
            {country.name.common}
            <button onClick={() => fetchDistricts(country.cca2)}>Fetch Districts</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Fetch;
