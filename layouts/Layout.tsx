/** @jsx precompile */
/** @jsxImportSource @hono/hono/jsx */
import type { FC } from "@hono/hono/jsx";

export const Layout: FC = (props) => {
  return (
    <html lang="en">
      <body>{props.children} </body>
    </html>
  );
};

export default Layout;