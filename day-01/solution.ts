import * as _ from "lodash";

const re = /\d/g;

const extractNumber = (input: string): number =>
  _.chain([...input.matchAll(re)])
    .map(_.head)
    .thru((arr: string[]) => _.join([_.first(arr), _.last(arr)], ""))
    .thru(Number);

export const part01 = (input: string): number =>
  _.chain(input).split("\n").map(extractNumber).sum().value();

// run
const input = await Deno.readTextFile("./input.txt");
console.log(part01(input));
