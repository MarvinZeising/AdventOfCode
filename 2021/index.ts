import depths from "./depths.ts";
import exampleDepths from "./example-depths.ts";
import getNumberOfIncreases from "./getNumberOfIncreases.ts";
import toThreeMeasurementWindows from "./toThreeMeasurementWindows.ts";

const windowSums = toThreeMeasurementWindows(exampleDepths).map((ds) =>
  ds.reduce((a, b) => a + b)
);

const result = getNumberOfIncreases(windowSums);

console.log(result);
