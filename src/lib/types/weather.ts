export interface WeatherData {
  "@context": Array<any>;
  id: string;
  type: string;
  geometry: Geometry;
  properties: Properties;
}

export interface Geometry {
  type: string;
  coordinates: number[];
}

export interface Properties {
  "@id": string;
  "@type": string;
  cwa: string;
  forecastOffice: string;
  gridId: string;
  gridX: number;
  gridY: number;
  forecast: string;
  forecastHourly: string;
  forecastGridData: string;
  observationStations: string;
  relativeLocation: RelativeLocation;
  forecastZone: string;
  county: string;
  fireWeatherZone: string;
  timeZone: string;
  radarStation: string;
}

export interface RelativeLocation {
  type: string;
  geometry: Geometry;
  properties: RelativeLocationProperties;
}

export interface RelativeLocationProperties {
  city: string;
  state: string;
  distance: Distance;
  bearing: Bearing;
}

export interface Distance {
  unitCode: string;
  value: number;
}

export interface Bearing {
  unitCode: string;
  value: number;
}
