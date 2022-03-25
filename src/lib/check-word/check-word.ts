// import languageRegex from "./en-regex";
import dictionary from "./dictionary.json";

export const checkWordExists = (word: string): boolean => {
  return word in dictionary;
};
