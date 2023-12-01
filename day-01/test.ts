import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";

import { part01 } from "./solution.ts";

Deno.test("part-01", () => {
  const input = `
    1abc2
    pqr3stu8vwx
    a1b2c3d4e5f
    treb7uchet
  `;
  assertEquals(part01(input), 142);
});
