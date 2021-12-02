type Windows = number[][];

export default function toThreeMeasurementWindows(array: number[]) {
  return array
    .reduce((windows: Windows, depth, index) => {
      if (index > 0) {
        if (!windows[index - 1]) {
          windows[index - 1] = [];
        }
        windows[index - 1].push(depth);
      }

      if (!windows[index]) {
        windows[index] = [];
      }
      windows[index].push(depth);

      if (!windows[index + 1]) {
        windows[index + 1] = [];
      }
      windows[index + 1].push(depth);

      return windows;
    }, [])
    .filter((window) => window.length === 3);
}
