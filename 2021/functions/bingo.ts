type BingoBoard = number[][];

const areBoardsValid = (boards: BingoBoard[]) => {
  return boards.every(
    (board) => board.length === 5 && board.every((row) => row.length === 5)
  );
};

const hasBingo = (board: BingoBoard, numbers: number[]): boolean => {
  // horizontal
  for (const row of board) {
    if (row.every((num) => numbers.includes(num))) {
      return true;
    }
  }

  // vertical
  for (let i = 0; i < 5; i++) {
    const column = board.map((row) => row[i]);
    if (column.every((num) => numbers.includes(num))) {
      return true;
    }
  }

  return false;
};

const getBoardSum = (board: BingoBoard, numbers: number[]): number => {
  return board.reduce((sum, row) => {
    return (
      sum +
      row
        .filter((num) => !numbers.includes(num))
        .reduce((sum, num) => sum + num, 0)
    );
  }, 0);
};

export default function getBingoWinnerSum(
  boards: BingoBoard[],
  numbers: number[]
) {
  if (!areBoardsValid(boards)) {
    return 0;
  }
  console.log("Boards are valid!");

  for (const index of numbers.keys()) {
    if (index > 0) {
      const drawnNumbers = numbers.slice(0, index);
      const drawnNumber = drawnNumbers[drawnNumbers.length - 1];
      console.log("drawn number: ", drawnNumber);

      for (const board of boards) {
        if (hasBingo(board, drawnNumbers)) {
          const sum = getBoardSum(board, drawnNumbers);
          const finalSum = sum * drawnNumber;
          return finalSum;
        }
      }
    }
  }

  return 0;
}
