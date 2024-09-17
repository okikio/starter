# Deno Starter Pack

This project is a **Deno-based** starter pack, offering a modern stack for building web apps with **Hono**, **EdgeDB**, **Biome**, and a testing setup with **@libs/testing** and **@std/expect**.

## Key Features

- **Deno**: Fast, secure runtime with TypeScript support built-in.
- **Hono**: Lightweight, expressive web framework (think of it as Deno's Next.js).
- **EdgeDB**: Powerful database combining SQL and NoSQL features.
- **Biome**: Formatting, linting, and CI with zero setup.
- **Universal Testing**: Test your app across Deno, Bun, and Node.js.

## Project Structure

Familiar if you've worked with Next.js:

```
.
├── pages/                # JSX-based rendering (similar to Next.js pages)
├── schemas/              # EdgeDB schemas
├── migrations/           # Database migrations
├── components/           # JSX components
├── mod.tsx               # Main Hono server
├── mod_test.ts           # Unit and integration tests
├── deno.jsonc            # Configuration for Deno
├── edgedb.toml           # EdgeDB setup
```

## Quick Start

1. **Clone the Repo**:
   ```bash
   git clone <repo-url> && cd <project>
   ```

2. **Install EdgeDB**:
   ```bash
   deno task edgedb:install
   ```

3. **Generate EdgeDB Files**:
   ```bash
   deno task edgedb:generate
   ```

4. **Run the Development Server** (like `next dev`):
   ```bash
   deno task dev
   ```

## Available Scripts

- **Run Dev Server**: Hot-reload server on `localhost:8000`:
  ```bash
  deno task dev
  ```

- **Run Tests**: Cross-environment testing (similar to Jest but runs in Deno, Node, and Bun):
  ```bash
  deno task test
  ```

- **Lint & Format**: Enforce code style:
  ```bash
  deno task lint
  ```

## EdgeDB Setup

EdgeDB is the database engine for this project. It merges SQL and NoSQL principles for a more flexible schema system. The workflow is similar to Prisma or Supabase for Next.js:

1. **Schema Definition**: Define types in `schemas/`. Example:

   ```esdl
   module default {
     type Person {
       required name: str;
     }
   }
   ```

2. **Apply Migrations**:
   ```bash
   edgedb migration create && edgedb migration apply
   ```

3. **Querying Data**:
   ```ts
   import { edgedb } from "~/path/to/generated/client";

   const people = await edgedb.query(`SELECT Person { name }`);
   ```

## Testing

Tests use `@libs/testing` for multi-environment compatibility and `@std/expect` for assertions (think Jest for Deno). Example test:

```ts
test("bun", "deno", "node")("Basic hono server test", async () => {
  const res = await app.request('/');
  expect(res.status).toBe(200);
  expect(await res.text()).toBe("Hono!");
});
```

Run tests:
```bash
deno task test
```

## JSX and Streaming

Hono supports JSX rendering and streaming responses, like React Server Components in Next.js:

1. **JSX Example**:
   ```tsx
   app.get('/', (c) => c.html(<Home messages={["Hi", "Bye"]} />));
   ```

2. **Streaming Example**:
   ```tsx
   app.get("/stream", (c) => {
     const stream = renderToReadableStream(<Weather />);
     return c.body(stream, { headers: { "Transfer-Encoding": "chunked" } });
   });
   ```

## Conclusion

This starter pack is designed to mirror some familiar patterns from Next.js but tailored for Deno’s ecosystem. Get started quickly, build modern apps, and leverage the simplicity of Deno with the flexibility of Hono and EdgeDB.
