type Increases = {
  increases: number;
  lastDepth?: number;
};

export default function getNumberOfIncreases(array: number[]) {
  const { increases } = array.reduce(
    (total: Increases, depth) => {
      let increases = total.increases;

      if (total.lastDepth && depth > total.lastDepth) {
        increases++;
      }

      return {
        increases,
        lastDepth: depth,
      };
    },
    { increases: 0, lastDepth: undefined }
  );

  return increases;
}
