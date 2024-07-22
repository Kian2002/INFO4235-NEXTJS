"use client";

import { useState } from "react";
import axios from "axios";
import '../styles/global.css'

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    const response = await axios.get(`/api/weather?city=${city}`);
    setWeather(response.data);
  };

  return (
    <div className="container">
      <h1>Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
      />
      <button onClick={fetchWeather}>Get Weather</button>

      {weather && (
        <div>
          <h2>{weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <p>{(weather.main.temp - 273.15).toFixed(2)}°C</p>
        </div>
      )}
    </div>
  );
}

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}
