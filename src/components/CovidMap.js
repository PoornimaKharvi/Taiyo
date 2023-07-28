import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';


const CovidMap = () => {
  const [countriesData, setCountriesData] = useState([]);

  useEffect(() => {
    fetchCovidData();
  }, []);

  const fetchCovidData = async () => {
    try {
      const response = await axios.get('https://disease.sh/v3/covid-19/countries');
      setCountriesData(response.data);
    } catch (error) {
      console.error('Error fetching COVID-19 data:', error);
    }
  };

  return (
    <MapContainer center={[0, 0]} zoom={2} style={{ height: '500px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {countriesData.map((country) => (
        <Marker key={country.country} position={[country.countryInfo.lat, country.countryInfo.long]}>
          <Popup>
            <div>
              <h2>{country.country}</h2>
              <p>Total Cases: {country.cases}</p>
              <p>Total Active Cases: {country.active}</p>
              <p>Total Recovered: {country.recovered}</p>
              <p>Total Deaths: {country.deaths}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default CovidMap;
