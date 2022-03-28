import { Letter, doesWordConsistsOfLetters } from "game/types";

type LetterToPoints = {
  [letter in Letter]: number;
};

const letterToPoints: LetterToPoints = {
  a: 1,
  b: 3,
  c: 3,
  d: 2,
  e: 1,
  f: 4,
  g: 2,
  h: 4,
  i: 1,
  j: 8,
  k: 5,
  l: 1,
  m: 3,
  n: 1,
  o: 1,
  p: 3,
  q: 10,
  r: 1,
  s: 1,
  t: 1,
  u: 1,
  v: 4,
  w: 4,
  x: 8,
  y: 4,
  z: 10,
};

export const getLetterPoints = (letter: Letter): number =>
  letterToPoints[letter];

export const getWordPoints = (word: string): number => {
  if (!doesWordConsistsOfLetters(word))
    throw new Error("Word must consist of letters");

  return word
    .split("")
    .reduce((acc, letter) => acc + getLetterPoints(letter as Letter), 0);
};
