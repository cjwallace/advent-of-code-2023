import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";

import { part1, part2 } from "./solution.ts";

Deno.test("part-1", () => {
  const input = `\
    467..114..
    ...*......
    ..35..633.
    ......#...
    617*......
    .....+.58.
    ..592.....
    ......755.
    ...$.*....
    .664.598..\
 `;
  assertEquals(part1(input), 4361);
});

Deno.test("part-2", () => {
  const input = `\
    467..114..
    ...*......
    ..35..633.
    ......#...
    617*......
    .....+.58.
    ..592.....
    ......755.
    ...$.*....
    .664.598..\
 `;
  assertEquals(part2(input), 467835);
});
