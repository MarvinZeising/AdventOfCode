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
