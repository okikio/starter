/** @jsx precompile */
/** @jsxImportSource @hono/hono/jsx */
import type { FC } from "@hono/hono/jsx";

/**
 * Interface to define the shape of the current weather data fetched from the API.
 */
interface CurrentWeatherData {
  time: string;
  temperature_2m: number;
  wind_speed_10m: number;
}

/**
 * Interface to define the shape of the API response.
 */
interface WeatherApiResponse {
  latitude: number;
  longitude: number;
  current: CurrentWeatherData;
}

export interface WeatherProps {
  name: string;
  longitude: number;
  latitude: number;
}

/**
 * Function to fetch the weather data from the API.
 * @returns The weather data as a promise.
 */
async function fetchWeatherData({
  latitude = 43.7001,
  longitude = -79.4163,
}: Partial<WeatherProps> = {}): Promise<WeatherApiResponse> {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }
  return response.json();
}

/**
 * A JSX component that renders the weather data.
 * @returns The JSX element to be rendered.
 */
export const WeatherComponent: FC<WeatherProps> = async (props) => {
  const name = props.name ?? "Toronto";
  const result = await fetchWeatherData(props);
  const { current: weather } = result;

  return (
    <div>
      <h2>Current Weather in {name}</h2>
      <p>Time: {new Date(weather.time).toLocaleString()}</p>
      <p>Temperature: {weather.temperature_2m}°C</p>
      <p>Wind Speed: {weather.wind_speed_10m} km/h</p>
    </div>
  );
};

export default WeatherComponent;
