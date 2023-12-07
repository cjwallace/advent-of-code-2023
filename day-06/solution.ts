const times = (record: number, duration: number): [number, number] => {
  const root = Math.sqrt(duration ** 2 - 4 * record);
  const lower = (duration - root) / 2;
  const upper = (duration + root) / 2;
  return [Math.floor(lower + 1), Math.ceil(upper - 1)];
};

const re = /(\d+)/g;

export const part1 = (input: string): number => {
  const lines = input.split("\n");
  const raceTimes = [...lines[0].matchAll(re)].map((x) => x[0]).map(Number);
  const raceRecords = [...lines[1].matchAll(re)].map((x) => x[0]).map(Number);
  const ranges = raceTimes
    .map((time, i) => times(raceRecords[i], time))
    .map(([lower, upper]) => upper - lower + 1);
  return ranges.reduce((a, b) => a * b, 1);
};

export const part2 = (input: string): number => {
  const lines = input.split("\n");
  const raceTime = Number(lines[0].replace(/ /g, "").match(re)![0]);
  const raceRecord = Number(lines[1].replace(/ /g, "").match(re)![0]);
  const [lower, upper] = times(raceRecord, raceTime);
  return upper - lower + 1;
};

if (import.meta.main) {
  const input = await Deno.readTextFile("input.txt");
  console.log(part1(input));
  console.log(part2(input));
}
