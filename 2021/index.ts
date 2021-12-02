import { getCourseOutcomeDepth } from "./functions/getCourseOutcome.ts";
import instructions from "./inputs/instructions.ts";
import { getCourseOutcomePosition } from "./functions/getCourseOutcome.ts";

// const windowSums = toThreeMeasurementWindows(exampleDepths).map((ds) =>
//   ds.reduce((a, b) => a + b)
// );

// const result = getNumberOfIncreases(windowSums);

const depth = getCourseOutcomeDepth(instructions);
const position = getCourseOutcomePosition(instructions);

console.log("depth: ", depth, " position: ", position);
console.log(depth * position);
