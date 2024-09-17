import { renderToReadableStream } from "@hono/hono/jsx/streaming";
import { Hono } from '@hono/hono';

import { Weather } from "~/pages/weather.tsx";
import { Home } from "~/pages/home.tsx";

const app = new Hono();
app.get('/', (c) => c.text('Hono!'))
app.get("/jsx", (c) => {
  const messages = ["Good Morning", "Good Evening", "Good Night"];
  return c.html(<Home messages={messages} />);
});

app.get("/stream", (c) => {
  const stream = renderToReadableStream(
    <Weather 
      name="Toronto"
      latitude={43.7001}
      longitude={-79.4163}
    />
  );
  return c.body(stream, {
    headers: {
      "Content-Type": "text/html; charset=UTF-8",
      "Transfer-Encoding": "chunked",
    },
  });
});

export default app;
