import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";

import { part1, part2 } from "./solution.ts";

const input = `\
Time:      7  15   30
Distance:  9  40  200\
`;

Deno.test("part-1", () => {
  assertEquals(part1(input), 288);
});

Deno.test("part-2", () => {
  assertEquals(part2(input), 71503);
});
