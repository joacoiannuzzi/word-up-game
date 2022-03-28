import { Level } from "./types";

export const getRandomNumbers = ({
  count,
  min,
  max,
}: {
  count: number;
  min: number;
  max: number;
}): number[] => {
  const numbers = Array.from(
    { length: count },
    () => Math.floor(Math.random() * (max - min + 1)) + min
  );
  if (new Set(numbers).size !== count) {
    return getRandomNumbers({ count, min, max });
  }
  return numbers;
};

export const isPreviousUp = ({
  levels,
  currentSquareId,
}: {
  levels: Level[];
  currentSquareId: string;
}): boolean => {
  const [levelIndex, squareIndex] = currentSquareId.split("-").map(Number);
  if (levelIndex === 0) return false;
  const previousLevel = levels[levelIndex - 1];
  return previousLevel.upsIndexes.includes(squareIndex);
};
