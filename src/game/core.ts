import { GameState, Letter, Level, Square } from "game/types";
import { getRandomNumbers } from "game/utils";
import { handleOption, isNone, isSome } from "lib/utils";
import { pipe } from "ramda";

const buildLevel = ({
  id,
  squareCount,
  upCount,
}: {
  id: number;
  squareCount: number;
  upCount: number;
}): Level => {
  const upsIndexes = getRandomNumbers({
    count: upCount,
    min: 0,
    max: squareCount - 1,
  });

  return {
    id: `${id}`,
    squares: Array.from({ length: squareCount }, (_, index) => ({
      id: `${id}-${index}`,
      letter: undefined,
      isUp: upsIndexes.includes(index),
    })),
    upsIndexes,
  };
};

const buildInitialState = (): GameState => {
  const levels = Array.from({ length: 10 }, (_, index) =>
    buildLevel({ id: index, squareCount: 5, upCount: 1 })
  );

  return {
    levels,
    currentLevelIndex: 0,
  };
};

const findEmptySquare = ({ level }: { level: Level }): number =>
  level.squares.findIndex((square) => isNone(square.letter));

const addLetterToSquare = ({
  squares,
  currentIndex,
  letter,
}: {
  squares: Square[];
  currentIndex: number;
  letter: Letter;
}): Square[] => {
  return squares.map((square, index) => {
    if (index !== currentIndex) return square;

    return {
      ...square,
      letter,
    };
  });
};

const moveLettersToNextLevel =
  (currentLevelIndex: number) =>
  (levels: Level[]): Level[] => {
    const currentLevel = levels[currentLevelIndex];
    const indexesToLetter = currentLevel.squares.reduce<{
      [index: number]: Letter;
    }>((acc, square, i) => {
      if (square.isUp)
        return {
          ...acc,
          [i]: handleOption(square.letter, {
            Some: (letter) => letter,
            None: () => {
              throw new Error("letter is not defined");
            },
          }),
        };
      return acc;
    }, {});

    const newLevels = levels.map((level, index) => {
      if (index !== currentLevelIndex + 1) return level;

      return {
        ...level,
        squares: level.squares.map((square, i) => {
          if (indexesToLetter[i] === undefined) return square;

          return {
            ...square,
            letter: indexesToLetter[i],
          };
        }),
      };
    });

    return newLevels;
  };

const addNewLevel = (levels: Level[]): Level[] => {
  const newLevel = buildLevel({
    id: levels.length,
    squareCount: 5,
    upCount: 1,
  });

  return [...levels, newLevel];
};

const addLetter =
  (gameState: GameState) =>
  (letter: Letter): GameState => {
    const { levels: levelsWithAddedLetter, shouldGoToNextLevel } =
      addLetterToLevel({
        levels: gameState.levels,
        letter,
        currentLevelIndex: gameState.currentLevelIndex,
      });

    if (shouldGoToNextLevel) {
      const newLevels = pipe(
        moveLettersToNextLevel(gameState.currentLevelIndex),
        addNewLevel
      )(levelsWithAddedLetter);
      return {
        ...gameState,
        levels: newLevels,
        currentLevelIndex: gameState.currentLevelIndex + 1,
      };
    }

    return {
      ...gameState,
      levels: levelsWithAddedLetter,
    };
  };

const removeLetter = (gameState: GameState) => (): GameState => {
  return gameState;
};

const addLetterToLevel = ({
  levels,
  letter,
  currentLevelIndex,
}: {
  levels: Level[];
  letter: Letter;
  currentLevelIndex: number;
}): {
  levels: Level[];
  shouldGoToNextLevel: boolean;
} => {
  const newLevels = levels.map((level, index) => {
    if (index !== currentLevelIndex) return level;

    const currentSquareIndex = findEmptySquare({ level });

    const squares = addLetterToSquare({
      squares: level.squares,
      currentIndex: currentSquareIndex,
      letter,
    });

    return {
      ...level,
      squares,
    };
  });

  const shouldGoToNextLevel = newLevels[currentLevelIndex].squares.every(
    (square) => isSome(square.letter)
  );

  // todo - check that word exists in dictionary

  return {
    levels: newLevels,
    shouldGoToNextLevel,
  };
};

const Game = {
  buildInitialState,
  addLetter,
  removeLetter,
};

export default Game;
