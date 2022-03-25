import { isLetter } from "game/types";
import { useKeyPress } from "hooks/common/useKeyPress";
import { useGameStore } from "hooks/useGameState";

export const useAddLetter = () => {
  const { addLetter } = useGameStore();
  useKeyPress(({ key }) => {
    if (isLetter(key)) addLetter(key);
  });
};

export const useRemoveLetter = () => {
  const { removeLetter } = useGameStore();
  useKeyPress(({ key }) => {
    if (key === "Backspace") removeLetter();
  });
};
