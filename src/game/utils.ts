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
