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
  const sum = board.reduce((sum, row) => {
    return (
      sum +
      row
        .filter((num) => !numbers.includes(num))
        .reduce((sum, num) => sum + num, 0)
    );
  }, 0);

  return sum * numbers[numbers.length - 1];
};

export function getBingoWinnerSum(boards: BingoBoard[], numbers: number[]) {
  if (!areBoardsValid(boards)) return 0;

  for (const index of numbers.keys()) {
    if (index > 0) {
      const drawnNumbers = numbers.slice(0, index);
      const drawnNumber = drawnNumbers[drawnNumbers.length - 1];
      console.log("drawn number: ", drawnNumber);

      for (const board of boards) {
        if (hasBingo(board, drawnNumbers)) {
          return getBoardSum(board, drawnNumbers);
        }
      }
    }
  }

  return 0;
}

export function getBingoLooserSum(boards: BingoBoard[], numbers: number[]) {
  if (!areBoardsValid(boards)) return 0;

  type Result = {
    boards: BingoBoard[];
    finalSum: number;
  };

  const result = numbers.reduce(
    (total: Result, _, index) => {
      if (index > 0 && total.boards.length > 0) {
        const drawnNumbers = numbers.slice(0, index);

        if (total.boards.length > 1) {
          return {
            boards: total.boards.filter(
              (board) => !hasBingo(board, drawnNumbers)
            ),
            finalSum: 0,
          };
        } else {
          const isWinner = hasBingo(total.boards[0], drawnNumbers);
          if (isWinner) {
            return {
              boards: [],
              finalSum: getBoardSum(total.boards[0], drawnNumbers),
            };
          }
        }
      }

      return total;
    },
    {
      boards,
      finalSum: 0,
    }
  );

  return result.finalSum;
}
