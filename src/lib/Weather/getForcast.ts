import { ForecastData } from "@/types/forecast-hourly";
import axios from "axios";
import getForecastEndpoint from "./getForecastEndpoint";
import path from "path";
import fs from "fs";
import cron from "node-cron";

const dataPath = path.join(__dirname, "../../data");
const d = new Date();
const year = d.getFullYear();
const month = d.getMonth() + 1;
const day = d.getDate();
const hour = d.getHours();
const min = d.getMinutes();
const date = `${year}-${month}-${day}-${hour}-${min}`;

export default async function getForecast(postalCode: string) {
  const url = await getForecastEndpoint(postalCode);

  try {
    const { data } = await axios.get<ForecastData>(url.forecast);
    const fileName = `${data.properties.periods[0].startTime}.json`;
    const filePath = path.join(dataPath, fileName);
    fs.writeFileSync(filePath, JSON.stringify(data.properties.periods));
    return data.properties.periods;
  } catch (error) {
    console.error("Error fetching forecast:", error);
    throw error;
  }
}

// start cron job to run every hour
const weatherUpdate = cron.schedule(
  "* 1 * * *",
  () => {
    console.log("Running cron job");
    getForecast("45013").catch((error) => {
      console.log(error);
    });
  },
  {
    scheduled: true,
    timezone: "America/New_York",
  }
);

weatherUpdate.start();
