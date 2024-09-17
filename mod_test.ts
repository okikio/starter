import { test } from "@libs/testing";
import { expect } from "@std/expect";
import app from "~/mod.tsx";

test("bun", "deno", "node")("Basic hono server test", async () => {
  const res = await app.request('/');
  expect(res.status).toBe( 200);
  expect(await res.text()).toBe("Hono!");
});