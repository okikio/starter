/** @jsx precompile */
/** @jsxImportSource @hono/hono/jsx */
import type { FC } from "@hono/hono/jsx";
import { Layout } from "~/layouts/Layout.tsx";

export const Home: FC<{ messages: string[] }> = (props) => {
  return (
    <Layout>
      <h1>Hello Hono! </h1>
      <ul>
        {props.messages.map((message) => {
          return <li key={message}>{message}!! </li>;
        })}
      </ul>
    </Layout>
  );
};

export default Home;