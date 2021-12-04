import { numbers, boards } from "./inputs/bingo.ts";
import { getBingoLooserSum } from "./functions/bingo.ts";

const finalSum = getBingoLooserSum(boards, numbers);

console.log(finalSum);
