/** @jsx precompile */
/** @jsxImportSource @hono/hono/jsx */
import type { FC } from "@hono/hono/jsx";

export interface MoviesProps {
  name: string;
  longitude: number;
  latitude: number;
}

/**
 * Function to fetch the weather data from the API.
 * @returns The weather data as a promise.
 */
async function fetchMovieData({
  latitude = 43.7001,
  longitude = -79.4163,
}: Partial<MoviesProps> = {}): Promise<unknown> {
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
export const WeatherComponent: FC<MoviesProps> = async (props) => {
  const name = props.name ?? "Toronto";
  const result = await fetchMovieData(props);

  return (
    <div>
      <h2>Movies in {name}</h2>
    </div>
  );
};

export default WeatherComponent;
