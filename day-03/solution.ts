type PartNumber = {
  digit: number;
  fullNumber: number;
  instanceId: string;
};

type Gear = {
  parts: [number, number];
};

type PartCell = {
  type: "part";
  x: number;
  y: number;
  value: PartNumber;
};

type GearCell = {
  type: "gear";
  x: number;
  y: number;
  value: Gear;
};

type OtherCell = {
  type: "other";
  x: number;
  y: number;
  value: string;
};

type Cell = PartCell | OtherCell | GearCell;

const parseLine = (line: string, iy: number): Cell[] => {
  const everything = /(\d+)|(.)/g;
  const columns = [...line.matchAll(everything)];
  const row: Cell[] = [];
  let ix = 0; // manual column index :/
  for (const c of columns) {
    if (Number(c[0])) {
      const fullNumber = Number(c[0]);
      const instanceId = crypto.randomUUID();
      for (const d of c[0].split("")) {
        const digit = Number(d);
        row.push({
          type: "part",
          x: ix,
          y: iy,
          value: { digit, fullNumber, instanceId },
        });
        ix += 1;
      }
    } else {
      row.push({ type: "other", x: ix, y: iy, value: c[0] });
      ix += 1;
    }
  }
  return row;
};

const surroundingCells = (grid: Cell[][], cell: Cell) => {
  const [x, y] = [cell.x, cell.y];
  const tl = grid[y - 1] && grid[y - 1][x - 1];
  const t = grid[y - 1] && grid[y - 1][x];
  const tr = grid[y - 1] && grid[y - 1][x + 1];
  const l = grid[y][x - 1];
  const r = grid[y][x + 1];
  const bl = grid[y + 1] && grid[y + 1][x - 1];
  const b = grid[y + 1] && grid[y + 1][x];
  const br = grid[y + 1] && grid[y + 1][x + 1];

  return [tl, t, tr, l, r, bl, b, br];
};

// part 1

const symbolRegex = /[^.0-9\s]/g; // any non-period, non-numeric, non-space

const isSymbol = (cell: Cell | undefined): boolean =>
  cell && typeof cell.value === "string"
    ? cell.value.match(symbolRegex) !== null
    : false;

const validPartNumber = (cell: Cell, grid: Cell[][]): cell is PartCell =>
  cell.type === "part" && surroundingCells(grid, cell).some(isSymbol);

const partNumbersOnRow = (cells: Cell[], grid: Cell[][]): PartCell[] =>
  cells.filter((cell): cell is PartCell => validPartNumber(cell, grid));

export const part1 = (input: string): number => {
  const grid = input
    .split("\n")
    .map((line) => line.trim())
    .map((line, iy) => parseLine(line, iy));

  const partInstances = grid.map((v, _, a) => partNumbersOnRow(v, a)).flat();

  // get unique part numbers
  const partNumbers = [
    ...new Map(
      partInstances.map((p) => [p.value.instanceId, p.value.fullNumber])
    ).values(),
  ];
  return partNumbers.reduce((acc, cur) => acc + cur, 0);
};

// part 2

const isPart = (cell: Cell | undefined): boolean =>
  cell !== undefined && cell.type === "part";

const validGear = (cell: Cell, grid: Cell[][]) => {
  if (cell.value !== "*") return cell;
  const [x, y] = [cell.x, cell.y];
  const parts = surroundingCells(grid, cell).filter((c): c is PartCell =>
    isPart(c)
  );
  const uniqueParts = [
    ...new Map(
      parts.map((p) => [p.value.instanceId, p.value.fullNumber])
    ).values(),
  ];
  return uniqueParts.length === 2
    ? { type: "gear", x, y, value: { parts: uniqueParts } }
    : cell;
};

const gearsOnRow = (row: Cell[], grid: Cell[][]) =>
  row
    .map((cell) => validGear(cell, grid))
    .filter((g): g is GearCell => g.type === "gear");

export const part2 = (input: string): number => {
  const grid = input
    .split("\n")
    .map((line) => line.trim())
    .map((line, iy) => parseLine(line, iy));

  const gears = grid.map((row, _, grid) => gearsOnRow(row, grid)).flat();
  return gears.reduce(
    (acc, cur) => acc + cur.value.parts[0] * cur.value.parts[1],
    0
  );
};

// run

if (import.meta.main) {
  const input = await Deno.readTextFile("input.txt");
  console.log(part1(input));
  console.log(part2(input));
}
