"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/globals.scss";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    try {
      const response = await axios.get(`/api/weather?city=${city}`);
      setWeather(response.data);
      setError(null);
    } catch (err) {
      setError("Unable to fetch weather data");
      setWeather(null);
    }
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await axios.get(
            `/api/weather?lat=${latitude}&lon=${longitude}`
          );
          console.log("Response Data:", response.data);
          setWeather(response.data);
        } catch (err) {
          setError("Unable to fetch weather data");
          setWeather(null);
        }
      });
    }
  }, []);

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

      {error && <p>{error}</p>}

      {weather && (
        <div>
          <h2>
            {weather.city?.name || "Current Location"}, {weather.city?.country}
          </h2>
          <div className="forecast">
            {(weather.list || weather.daily).slice(0, 7).map((day, index) => (
              <div key={index} className="day">
                <img
                  src={`http://openweathermap.org/img/wn/${
                    day.weather[0].icon || day.weather[0].icon
                  }@2x.png`}
                  alt="weather icon"
                />
                <p>
                  {new Date((day.dt || day.dt) * 1000).toLocaleDateString()}
                </p>
                <p>{day.weather[0].description}</p>
                <p>{Math.ceil((day.main?.temp || day.temp.day) - 273.15)}°C</p>
                <p>Humidity: {day.main?.humidity || day.humidity}%</p>
                <p>Wind: {day.wind?.speed || day.wind_speed} m/s</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
