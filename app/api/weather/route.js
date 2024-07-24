import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city");
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  const apiKey = process.env.WEATHER_API_KEY;

  let url;
  if (city) {
    url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
  } else if (lat && lon) {
    url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${apiKey}`;
  } else {
    return NextResponse.json(
      { error: "City or coordinates are required" },
      { status: 400 }
    );
  }

  try {
    const response = await axios.get(url);
    console.log("Response Status:", response.status);
    console.log("Response Data:", response.data);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    return NextResponse.json(
      { error: "Unable to fetch weather data" },
      { status: 500 }
    );
  }
}
