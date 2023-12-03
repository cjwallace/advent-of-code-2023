const MAX_RED = 12;
const MAX_GREEN = 13;
const MAX_BLUE = 14;

type Draw = {
  red: number;
  green: number;
  blue: number;
};

type Game = {
  id: number;
  draws: Draw[];
};

const parseDraw = (draw: string): Draw => {
  const cubes = draw
    .split(",")
    .map((x) => x.trim())
    .map((x) => x.split(" "));

  let [red, green, blue] = [0, 0, 0];
  for (const cube of cubes) {
    switch (cube[1]) {
      case "red":
        red = Number(cube[0]);
        break;
      case "green":
        green = Number(cube[0]);
        break;
      case "blue":
        blue = Number(cube[0]);
        break;
    }
  }

  return { red, green, blue };
};

const parseDraws = (drawsString: string): Draw[] => {
  const draws = drawsString
    .split(";")
    .map((x) => x.trim())
    .map((x) => parseDraw(x));
  return draws;
};

const parseGameId = (game: string): number => {
  return Number(game.replace("Game ", ""));
};

const parseGame = (line: string): Game => {
  const [gameString, drawsString] = line.split(":");
  const id = parseGameId(gameString);
  const draws = parseDraws(drawsString);
  return { id, draws };
};

const drawIsPossible = (draw: Draw): boolean =>
  draw.red <= MAX_RED && draw.green <= MAX_GREEN && draw.blue <= MAX_BLUE;

const drawsArePossible = (draws: Draw[]): boolean =>
  draws.map((draw) => drawIsPossible(draw)).reduce((a, b) => a && b, true);

const requiredCubes = (draws: Draw[]): Draw =>
  draws.reduce(
    (a, b) => ({
      red: Math.max(a.red, b.red),
      green: Math.max(a.green, b.green),
      blue: Math.max(a.blue, b.blue),
    }),
    { red: 0, green: 0, blue: 0 }
  );

const gamePower = (draws: Draw[]): number => {
  const cubes = requiredCubes(draws);
  return cubes.red * cubes.green * cubes.blue;
};

// part 1

export const part1 = (input: string): number => {
  const parsed = input.split("\n").map(parseGame);
  const validated = parsed.filter((game) => drawsArePossible(game.draws));
  return validated.reduce((a, b) => a + b.id, 0);
};

// part 2

export const part2 = (input: string): number => {
  const parsed = input.split("\n").map(parseGame);
  const powers = parsed.map((game) => gamePower(game.draws));
  return powers.reduce((a, b) => a + b, 0);
};

// run

if (import.meta.main) {
  const input = await Deno.readTextFile("input.txt");
  console.log(part1(input));
  console.log(part2(input));
}
