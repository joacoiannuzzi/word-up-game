import words5 from "./words5.json";

export const checkWordExists = (word: string): boolean => {
  const exists = words5.includes(word);
  console.log({ word, exists });
  return exists;
};
