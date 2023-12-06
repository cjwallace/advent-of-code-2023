export const part1 = (input: string): number => {
  const chunks = input.split("\n\n");
  let seeds = chunks[0].split(": ")[1].split(" ").map(Number);
  console.log(seeds);

  for (const chunk of chunks.slice(1)) {
    const lines = chunk.split("\n");
    const map = lines.slice(1).map((line) => line.split(" ").map(Number));
    const deltas: number[][] = [];
    for (const row of map) {
      const [destination, source, range] = row;
      const delta = seeds.map((seed) => {
        if (seed >= source && seed < source + range) {
          return destination - source;
        } else {
          return 0;
        }
      });
      deltas.push(delta);
    }
    seeds = seeds.map(
      (seed, i) =>
        seed + deltas.map((delta) => delta[i]).reduce((a, b) => a + b, 0)
    );
    console.log(seeds);
  }
  return Math.min(...seeds);
};

type Range = [start: number, end: number];

const seedRanges = (arr: number[]): Range[] => {
  const chunks = Array(Math.ceil(arr.length / 2))
    .fill(null)
    .map((_, i) => [arr[i * 2], arr[i * 2 + 1]]);
  const ranges: Range[] = chunks.map(([start, delta]) => [
    start,
    start + delta - 1,
  ]);
  return ranges;
};

const overlapIndicies = (a: Range, b: Range): Range => {
  const [aStart, aEnd] = a;
  const [bStart, bEnd] = b;
  return [Math.max(aStart, bStart), Math.min(aEnd, bEnd)];
};

export const part2 = (input: string) => {
  const blocks = input.split("\n\n");
  const chunks = blocks[0].split(": ")[1].split(" ").map(Number);
  let seeds = seedRanges(chunks);

  for (const block of blocks.slice(1)) {
    const lines = block.split("\n");
    const maps = lines.slice(1).map((line) => line.split(" ").map(Number));
    let newSeeds: Range[] = [];

    while (seeds.length > 0) {
      const seed = seeds.pop();
      if (seed === undefined) break;

      const seedStart = seed[0];
      const seedEnd = seed[1];
      let overlap = false;

      for (const row of maps) {
        const [destination, source, range] = row;
        const diff = destination - source;

        const [start, end] = [source, source + range - 1];
        const [overlapStart, overlapEnd] = overlapIndicies(seed, [
          source,
          source + range - 1,
        ]);

        if (overlapStart < overlapEnd) {
          overlap = true;
          if (seedStart < start) {
            seeds = seeds.concat([[seedStart, start]]);
          } else if (end > seedEnd) {
            seeds = seeds.concat([[end, seedEnd]]);
          }
          newSeeds = newSeeds.concat([
            [overlapStart + diff, overlapEnd + diff],
          ]);
        }
      }
      if (!overlap) {
        newSeeds = newSeeds.concat([seed]);
      }
    }
    seeds = newSeeds;
    console.log(seeds);
  }
  return Math.min(...seeds.map((seed) => seed[0]));
};

if (import.meta.main) {
  const input = await Deno.readTextFile("input.txt");
  console.log(part1(input));
  console.log(part2(input));
}
