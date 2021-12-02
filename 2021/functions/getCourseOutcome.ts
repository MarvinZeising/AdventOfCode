type Outcome = {
  depth: number;
  position: number;
  aim: number;
};

export function getCourseOutcome(instructions: string[]): Outcome {
  return instructions.reduce(
    (total: Outcome, instruction) => {
      const [direction, amount] = instruction.split(" ");
      if (direction === "down") {
        return {
          ...total,
          aim: total.aim + parseInt(amount),
        };
      }
      if (direction === "up") {
        return {
          ...total,
          aim: total.aim - parseInt(amount),
        };
      }
      if (direction === "forward") {
        return {
          ...total,
          position: total.position + parseInt(amount),
          depth: total.depth + total.aim * parseInt(amount),
        };
      }
      return total;
    },
    {
      depth: 0,
      position: 0,
      aim: 0,
    }
  );
}

export function getCourseOutcomeDepth(instructions: string[]): number {
  return instructions.reduce((total, instruction) => {
    const [direction, amount] = instruction.split(" ");
    if (direction === "down") {
      return total + parseInt(amount);
    }
    if (direction === "up") {
      return total - parseInt(amount);
    }
    return total;
  }, 0);
}

export function getCourseOutcomePosition(instructions: string[]): number {
  return instructions.reduce((total, instruction) => {
    const [direction, amount] = instruction.split(" ");
    if (direction === "forward") {
      return total + parseInt(amount);
    }
    return total;
  }, 0);
}
