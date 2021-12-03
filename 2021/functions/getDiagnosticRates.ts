type Rates = {
  gamma: number;
  epsilon: number;
};

const bitsAtPos = (array: string[], pos: number) => {
  return array.reduce((total: string, item) => {
    return total + item[pos];
  }, "");
};

export default function getDiagnosticRates(diagnostics: string[]) {
  const ratesBinary = diagnostics[0].split("").reduce(
    (acc, _, index) => {
      const bits = bitsAtPos(diagnostics, index);
      const is1MostUsed =
        bits.split("").filter((x) => x === "1").length >
        bits.split("").filter((x) => x === "0").length;

      return {
        gamma: acc.gamma + (is1MostUsed ? "1" : "0"),
        epsilon: acc.epsilon + (is1MostUsed ? "0" : "1"),
      };
    },
    { gamma: "", epsilon: "" }
  );

  return {
    gamma: parseInt(ratesBinary.gamma, 2),
    epsilon: parseInt(ratesBinary.epsilon, 2),
  };
}
