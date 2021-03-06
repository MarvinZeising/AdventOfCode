import { PNGImage } from "https://deno.land/x/dpng@0.7.5/lib/PNGImage.ts";

type Grid = number[][];
type GridLine = { x1: number; y1: number; x2: number; y2: number };

const toGridLines = (ventLines: string[]): GridLine[] => {
  return ventLines.reduce((total: GridLine[], line) => {
    const [x1, y1, x2, y2] = line
      .split(" -> ")
      .map((c) => c.split(","))
      .flat()
      .map((c) => parseInt(c, 10));

    return [...total, { x1, y1, x2, y2 }];
  }, []);
};

const generateGrid = (gridLines: GridLine[]): Grid => {
  type Result = { xMin: number; xMax: number; yMin: number; yMax: number };

  const result = gridLines.reduce(
    (total: Result, line) => {
      return {
        xMin: Math.min(total.xMin, line.x1, line.x2),
        xMax: Math.max(total.xMax, line.x1, line.x2),
        yMin: Math.min(total.yMin, line.y1, line.y2),
        yMax: Math.max(total.yMax, line.y1, line.y2),
      };
    },
    { xMin: 0, xMax: 0, yMin: 0, yMax: 0 }
  );

  console.log("Grid:", result);

  return Array.from(Array(result.yMax + 1)).map(() => {
    return Array.from(Array(result.xMax + 1)).map(() => 0);
  });
};

const drawLines = (grid: Grid, lines: GridLine[]): Grid => {
  return lines.reduce((total: Grid, line) => {
    if (line.x1 === line.x2 || line.y1 === line.y2) {
      for (
        let x = Math.min(line.x1, line.x2);
        x <= Math.max(line.x1, line.x2);
        x++
      ) {
        for (
          let y = Math.min(line.y1, line.y2);
          y <= Math.max(line.y1, line.y2);
          y++
        ) {
          total[y][x]++;
        }
      }
    } else {
      const slope = (line.y2 - line.y1) / (line.x2 - line.x1);
      const b = line.y1 - slope * line.x1;

      for (
        let x = Math.min(line.x1, line.x2);
        x <= Math.max(line.x1, line.x2);
        x++
      ) {
        const y = slope * x + b;
        total[y][x]++;
      }
    }

    return total;
  }, grid);
};

const generateImage = (grid: Grid): PNGImage => {
  const image = new PNGImage(grid[0].length, grid.length);
  const white = image.createRGBColor({ r: 255, g: 255, b: 255, a: 1 });
  const black = image.createRGBColor({ r: 0, g: 0, b: 0, a: 1 });

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] > 0) {
        image.setPixel(x, y, black);
      } else {
        image.setPixel(x, y, white);
      }
    }
  }

  return image;
};

export default function getNumberOfOverlappingLines(ventLines: string[]) {
  const gridLines = toGridLines(ventLines);
  const grid = generateGrid(gridLines);
  const gridWithLines = drawLines(grid, gridLines);
  const numberOfOverlappingPoints = gridWithLines
    .map((l) => l.filter((p) => p > 1).length)
    .reduce((total, line) => total + line, 0);

  const image = generateImage(gridWithLines);
  Deno.writeFileSync("vents.png", image.getBuffer());

  return numberOfOverlappingPoints;
}
