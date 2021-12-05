import ventLines from "./inputs/vents.ts";
import getNumberOfOverlappingLines from "./functions/vents.ts";

const count = getNumberOfOverlappingLines(ventLines);

console.log(count);
