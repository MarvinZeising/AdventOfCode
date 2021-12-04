import { getLifeSupportRates } from "./functions/getDiagnosticRates.ts";
import diagnostics from "./inputs/diagnostics.ts";

const oxygen = getLifeSupportRates(diagnostics, "oxygen");
const co2scrubber = getLifeSupportRates(diagnostics, "co2scrubber");

console.log("oxygen: ", oxygen, " co2scrubber: ", co2scrubber);
console.log(oxygen * co2scrubber);
