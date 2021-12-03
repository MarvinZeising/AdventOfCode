import getDiagnosticRates from "./functions/getDiagnosticRates.ts";
import diagnostics from "./inputs/diagnostics.ts";

const { gamma, epsilon } = getDiagnosticRates(diagnostics);

console.log("gamma: ", gamma, " epsilon: ", epsilon);
console.log(gamma * epsilon);
