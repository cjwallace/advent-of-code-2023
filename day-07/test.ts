import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";

import { part1, part2 } from "./solution.ts";

const input = `\
32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483\
`;

Deno.test("part-1", () => {
  assertEquals(part1(input), 6440);
});

Deno.test("part-2", () => {
  assertEquals(part2(input), 5905);
});
