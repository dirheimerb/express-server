export interface ForecastData {
  "@context": Array<any>;
  type: string;
  geometry: Geometry;
  properties: ForecastProperties;
}

export interface Geometry {
  type: string;
  coordinates: number[][][];
}

export interface ForecastProperties {
  updated: string;
  units: string;
  forecastGenerator: string;
  generatedAt: string;
  updateTime: string;
  validTimes: string;
  elevation: Elevation;
  periods: Period[];
}

export interface Elevation {
  unitCode: string;
  value: number;
}

export interface Period {
  number: number;
  name: string;
  startTime: string;
  endTime: string;
  isDaytime: boolean;
  temperature: number;
  temperatureUnit: string;
  temperatureTrend: null;
  probabilityOfPrecipitation: ProbabilityOfPrecipitation | null;
  dewpoint: Dewpoint;
  relativeHumidity: RelativeHumidity;
  windSpeed: string;
  windDirection: string;
  icon: string;
  shortForecast: string;
  detailedForecast: string;
}

export interface ProbabilityOfPrecipitation {
  unitCode: string;
  value: number | null;
}

export interface Dewpoint {
  unitCode: string;
  value: number;
}

export interface RelativeHumidity {
  unitCode: string;
  value: number;
}
