import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";

Deno.test({
  name: "test example",
  fn: () => {
    const x = 1 + 2;
    assertEquals(x, 3);
  },
});
