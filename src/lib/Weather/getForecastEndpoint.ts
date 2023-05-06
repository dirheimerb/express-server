import axios from "axios";
import getLatLongFromZipCode from "./getLatLongFromPostalCode";
import type { WeatherData } from "@/types/forecast";

export default async function getForecastEndpoint(postalCode: string) {
  const location = await getLatLongFromZipCode(postalCode);
  const url = `https://api.weather.gov/points/${location.lat},${location.lon}`;

  try {
    const { data } = await axios.get<WeatherData>(url);
    return data.properties;
  } catch (error) {
    console.error("Error fetching forecast:", error);
    throw error;
  }
}
