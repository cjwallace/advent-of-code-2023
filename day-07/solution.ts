const deck = "23456789TJQKA";
const jokerDeck = "J23456789TQKA";

const ofAKind = (hand: string, n: number): boolean =>
  Object.values(Object.groupBy(hand, (x) => x)).some((x) => x.length === n);

const twoPair = (hand: string): boolean =>
  Object.values(Object.groupBy(hand, (x) => x)).filter((x) => x.length === 2)
    .length === 2;

const handScore = (hand: string): number =>
  ofAKind(hand, 5) // five of a kind
    ? 6
    : ofAKind(hand, 4) // four of a kind
    ? 5
    : ofAKind(hand, 3) && ofAKind(hand, 2) // full house
    ? 4
    : ofAKind(hand, 3) // three of a kind
    ? 3
    : twoPair(hand) // two pair
    ? 2
    : ofAKind(hand, 2) // one pair
    ? 1
    : 0; // high card

const jokerize = (hand: string): string => {
  if (hand == "JJJJJ") return hand;

  const cardCounts = { ...Object.groupBy(hand, (x) => x), J: [] };
  const mostCommonCard = Object.values(cardCounts).sort((a, b) =>
    a.length > b.length ? -1 : 1
  )[0][0];
  const jokerizedHand = hand.replaceAll(/J/g, mostCommonCard);
  return jokerizedHand;
};

const compareHands = (
  a: string,
  b: string,
  cards: string,
  options: { joker: boolean } = { joker: false }
): number => {
  const handA = options.joker ? jokerize(a) : a;
  const handB = options.joker ? jokerize(b) : b;

  const scoreA = handScore(handA);
  const scoreB = handScore(handB);

  if (scoreA > scoreB) {
    return 1;
  } else if (scoreA < scoreB) {
    return -1;
  } else {
    for (let i = 0; i < 5; i++) {
      const diff = cards.indexOf(a[i]) - cards.indexOf(b[i]);
      if (diff !== 0) {
        return Math.sign(diff);
      }
    }
  }
  return 0;
};

const winnings = (
  input: string,
  comparator: (a: string, b: string) => number
) =>
  input
    .split("\n")
    .map((line) => line.split(" "))
    .map(([h, b]) => ({
      hand: h,
      bid: Number(b),
    }))
    .sort((a, b) => comparator(a.hand, b.hand))
    .reduce((acc, player, i) => acc + player.bid * (i + 1), 0);

export const part1 = (input: string): number =>
  winnings(input, (a, b) => compareHands(a, b, deck, { joker: false }));

export const part2 = (input: string): number =>
  winnings(input, (a, b) => compareHands(a, b, jokerDeck, { joker: true }));

if (import.meta.main) {
  const input = await Deno.readTextFile("input.txt");
  console.log(part1(input));
  console.log(part2(input));
}
