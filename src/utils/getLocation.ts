import axios from "axios";
const weatherKey = process.env.WEATHER_API_KEY;

import type { Location } from "@/types/Location";

export default async function getLatLongFromZipCode(
  postalCode: string
): Promise<Location> {
  const url = `http://api.weatherapi.com/v1/search.json?key=6a14c88ec80e4dd597e121736222105&q=${postalCode}`;
  try {
    const response = await axios.get(url);
    const data = response.data as Location[];
    return {
      id: data[0].id,
      name: data[0].name,
      region: data[0].region,
      lat: data[0].lat,
      lon: data[0].lon,
      url: data[0].url,
      country: data[0].country,
    };
  } catch (error) {
    console.error("Error fetching lat and long:", error);
    throw error;
  }
}
