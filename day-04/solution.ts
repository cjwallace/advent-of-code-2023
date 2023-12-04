const parse = (input: string): number[][][] => {
  const lines = input.split("\n");
  const re = /(\d+)/g;
  const numbers = lines.map((line) =>
    line
      .split(":")[1]
      .split("|")
      .map((part) => [...part.matchAll(re)])
      .map((matches) => matches.map((m) => Number(m[0])))
  );
  return numbers;
};

const overlap = (a: number[], b: number[]): number =>
  a.filter((n) => b.includes(n)).length;

// part 1

export const part1 = (input: string): number => {
  const numbers = parse(input);
  const scores = numbers.map(([left, right]) => {
    const winningNumbers = overlap(left, right);
    return winningNumbers ? 2 ** (winningNumbers - 1) : 0;
  });
  return scores.reduce((a, b) => a + b, 0);
};

// part 2

export const part2 = (input: string): number => {
  const numbers = parse(input);
  const cardCounts = new Array(numbers.length).fill(1);
  numbers.forEach(([left, right], ix) => {
    const cardNo = ix + 1;
    const winnings = overlap(left, right);
    for (let i = cardNo; i < cardNo + winnings; i++) {
      cardCounts[i] += cardCounts[ix];
    }
  });
  return cardCounts.reduce((a, b) => a + b, 0);
};

// run

if (import.meta.main) {
  const input = await Deno.readTextFile("input.txt");
  console.log(part1(input));
  console.log(part2(input));
}
