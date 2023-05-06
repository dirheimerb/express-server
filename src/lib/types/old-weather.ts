export interface Location {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
}

export interface Condition {
  text: string;
  icon: string;
  code: number;
}

export interface AirQuality {
  co: number;
  no2: number;
  o3: number;
  so2: number;
  pm2_5: number;
  pm10: number;
  "us-epa-index": number;
  "gb-defra-index": number;
}
export interface Day {
  maxtemp_f: number;
  mintemp_f: number;
  avgtemp_f: number;
  maxwind_mph: number;
  totalprecip_in: number;
  totalsnow_cm: number;
  avgvis_miles: number;
  avghumidity: number;
  daily_will_it_rain: number;
  daily_chance_of_rain: number;
  daily_will_it_snow: number;
  daily_chance_of_snow: number;
  condition: Condition;
  uv: number;
}

export interface Astro {
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  moon_phase: string;
  moon_illumination: string;
  is_moon_up: number;
  is_sun_up: number;
}

export interface Hour {
  time_epoch: number;
  time: string;
  temp_f: number;
  is_day: number;
  condition: Condition;
  wind_mph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_in: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_f: number;
  windchill_f: number;
  heatindex_f: number;
  dewpoint_f: number;
  will_it_rain: number;
  chance_of_rain: number;
  will_it_snow: number;
  chance_of_snow: number;
  vis_miles: number;
  gust_mph: number;
  uv: number;
}

export interface ForecastDay {
  date: string;
  date_epoch: number;
  day: Day;
  astro: Astro;
  hour: Hour[];
}

export interface Forecast {
  forecastday: ForecastDay[];
}

export interface Alerts {
  alert: any[]; // Replace 'any' with the appropriate type if you have more information about the alert structure.
}
export interface Current {
  last_updated_epoch: number;
  last_updated: string;
  temp_f: number;
  is_day: number;
  condition: Condition;
  wind_mph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_in: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_f: number;
  vis_miles: number;
  uv: number;
  gust_mph: number;
  air_quality: AirQuality;
}

interface WeatherData {
  location: Location;
  current: Current;
  forecast: Forecast;
  alerts: Alerts;
}

export default WeatherData;
