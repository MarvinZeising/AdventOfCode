import { numbers, boards } from "./inputs/bingo.ts";
import getBingoWinnerSum from "./functions/bingo.ts";

const finalSum = getBingoWinnerSum(boards, numbers);

console.log(finalSum);
