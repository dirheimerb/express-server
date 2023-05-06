import axios from "axios";
const weatherAPIKey = "6a14c88ec80e4dd597e121736222105";
import type { Location } from "@/types/Location";

export default async function getLatLongFromZipCode(
  postalCode: string
): Promise<Location> {
  const url = `http://api.weatherapi.com/v1/search.json?key=${weatherAPIKey}&q=${postalCode}`;

  try {
    const { data } = await axios.get<Location[]>(url);
    return data[0];
  } catch (error) {
    console.error("Error fetching lat and long:", error);
    throw error;
  }
}
