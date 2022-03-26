import { Option } from "lib/utils";

export type Letter =
  | "a"
  | "b"
  | "c"
  | "d"
  | "e"
  | "f"
  | "g"
  | "h"
  | "i"
  | "j"
  | "k"
  | "l"
  | "m"
  | "n"
  | "o"
  | "p"
  | "q"
  | "r"
  | "s"
  | "t"
  | "u"
  | "v"
  | "w"
  | "x"
  | "y"
  | "z";

export type Square = {
  id: string;
  letter: Option<Letter>;
  isUp: boolean;
};

export type Level = {
  id: string;
  squares: Square[];
  upsIndexes: number[];
};

export type GameState = {
  levels: Level[];
  currentLevelIndex: number;
  words: string[];
  points: number;
};

export const isLetter = (letter: string): letter is Letter => {
  return [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ].includes(letter);
};
