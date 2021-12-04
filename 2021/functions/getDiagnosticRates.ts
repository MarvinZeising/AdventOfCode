const bitsAtPos = (array: string[], pos: number) => {
  return array.reduce((total: string, item) => {
    return total + item[pos];
  }, "");
};

export function getDiagnosticRates(diagnostics: string[]) {
  type Rates = {
    gamma: string;
    epsilon: string;
  };

  const ratesBinary = diagnostics[0].split("").reduce(
    (total: Rates, _, index) => {
      const bits = bitsAtPos(diagnostics, index);
      const is1MostUsed =
        bits.split("").filter((x) => x === "1").length >
        bits.split("").filter((x) => x === "0").length;

      return {
        gamma: total.gamma + (is1MostUsed ? "1" : "0"),
        epsilon: total.epsilon + (is1MostUsed ? "0" : "1"),
      };
    },
    { gamma: "", epsilon: "" }
  );

  return {
    gamma: parseInt(ratesBinary.gamma, 2),
    epsilon: parseInt(ratesBinary.epsilon, 2),
  };
}

export function getLifeSupportRates(
  diagnostics: string[],
  type: "oxygen" | "co2scrubber"
) {
  const filteredDiagnostics = diagnostics[0]
    .split("")
    .reduce((total, _, index) => {
      if (total.length === 1) return total;

      const bits = bitsAtPos(total, index);

      const numberOfOnes = bits.split("").filter((x) => x === "1").length;
      const is1MostUsed = numberOfOnes >= bits.length / 2;
      const use1 = type === "oxygen" ? is1MostUsed : !is1MostUsed;
      const criteriaBit = use1 ? "1" : "0";

      return total.filter((item) => item[index] === criteriaBit);
    }, diagnostics);

  return parseInt(filteredDiagnostics[0], 2);
}
