// DELETE ME:
// This file can be used for dynamic routing
// essentialy you can route the user to /Vancouver for example and it opens a new page with the weather in Vancouver

import axios from "axios";

async function fetchWeatherData(city) {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}`
  );
  return response.data;
}

export default async function CityWeather({ params }) {
  const weather = await fetchWeatherData(params.city);

  return (
    <div className="container">
      <h1>Weather in {weather.name}</h1>
      <p>{weather.weather[0].description}</p>
      <p>{(weather.main.temp - 273.15).toFixed(2)}°C</p>
    </div>
  );
}

export async function generateStaticParams() {
  return []; // No paths to pre-render initially
}

export async function generateMetadata({ params }) {
  const weather = await fetchWeatherData(params.city);
  return {
    title: `Weather in ${weather.name}`,
    description: `Current weather in ${weather.name}`,
  };
}

export const revalidate = 60; // Revalidate every minute
