/** @jsx precompile */
/** @jsxImportSource @hono/hono/jsx */
import { ErrorBoundary, type FC } from "@hono/hono/jsx";
import { Suspense } from "@hono/hono/jsx/streaming";

import { WeatherComponent, type WeatherProps } from "~/components/Weather.tsx";
import { Layout } from "~/layouts/Layout.tsx";

export const Weather: FC<WeatherProps> = (props) => {
  return (
    <Layout>
      <ErrorBoundary fallback={<div>Out of Service</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <WeatherComponent {...props} />
        </Suspense>
      </ErrorBoundary>
    </Layout>
  );
};

export default Weather;