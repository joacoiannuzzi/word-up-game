import create from "zustand";
import Game from "game/core";
import { GameState, Letter } from "game/types";

type GameStore = {
  gameState: GameState;
  addLetter: (letter: Letter) => void;
  removeLetter: () => void;
};

export const useGameStore = create<GameStore>((set) => ({
  gameState: Game.buildInitialState(),
  addLetter: (letter) => {
    set((state) => ({
      ...state,
      gameState: Game.addLetter(state.gameState)(letter),
    }));
  },
  removeLetter: () => {
    set((state) => ({
      ...state,
      gameState: Game.removeLetter(state.gameState)(),
    }));
  },
}));
