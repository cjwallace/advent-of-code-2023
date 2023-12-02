const lineToNumber = (
  line: string,
  lineToDigits: (line: string) => string[]
): number => {
  const digits = lineToDigits(line);
  const first = digits[0];
  const last = digits[digits.length - 1];

  return Number(first + last);
};

// part 01

const digitRegex = /\d/g;
const numberLineToDigits = (line: string): string[] =>
  [...line.matchAll(digitRegex)].map((x) => x[0]);

export const part1 = (input: string): number =>
  input
    .split("\n")
    .map((line: string) => lineToNumber(line, numberLineToDigits))
    .reduce((a, b) => a + b, 0);

// part 02

const numbers = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

const numberWordRegex =
  /(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g;

const wordToDigit = (word: string): string =>
  word.length === 1 ? word : numbers.indexOf(word).toString();

const wordLineToDigits = (line: string): string[] => {
  const matches = line.matchAll(numberWordRegex);

  const out = [];
  for (const match of matches) {
    if (match.index !== undefined) {
      const numberName = line.slice(match.index, match.index + match[1].length);
      const n = wordToDigit(numberName);
      out.push(n);
    }
  }
  return out;
};

export const part2 = (input: string): number =>
  input
    .split("\n")
    .map((line: string) => lineToNumber(line, wordLineToDigits))
    .reduce((a, b) => a + b, 0);

// run

if (import.meta.main) {
  const input = await Deno.readTextFile("./input.txt");
  console.log(part01(input));
  console.log(part02(input));
}
