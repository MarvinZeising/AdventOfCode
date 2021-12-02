import { getCourseOutcome } from "./functions/getCourseOutcome.ts";
import instructions from "./inputs/instructions.ts";

const { depth, position } = getCourseOutcome(instructions);

console.log("depth: ", depth, " position: ", position);
console.log(depth * position);
