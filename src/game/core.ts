import { GameState, Letter, Level, Square } from "game/types";
import { getRandomNumbers } from "game/utils";
import { checkWordExists } from "lib/check-word";
import { handleOption, ifElse, isNone, isSome } from "lib/utils";
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
    const { level: levelWithAddedLetter, shouldGoToNextLevel } =
      addLetterToLevel({
        level: gameState.levels[gameState.currentLevelIndex],
        letter,
      });

    const levelsWithAddedLetter = gameState.levels.map((level, index) => {
      if (index !== gameState.currentLevelIndex) return level;
      return levelWithAddedLetter;
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
  const currentLevel = gameState.levels[gameState.currentLevelIndex];
  const reversedSquares = [...currentLevel.squares].reverse();

  const previousLevel = gameState.levels[gameState.currentLevelIndex - 1];

  const indexToRemove = handleOption(previousLevel, {
    None: () => reversedSquares.findIndex((square) => isSome(square.letter)),
    Some: (prevLevel) => {
      const prevLevelUps = prevLevel.upsIndexes.map(
        (index) => prevLevel.squares.length - index - 1
      );

      return reversedSquares.findIndex(
        (square, i) => !prevLevelUps.includes(i) && isSome(square.letter)
      );
    },
  });

  if (indexToRemove === -1) return gameState;

  const removedReversedSquares = reversedSquares.map((square, index) =>
    index !== indexToRemove
      ? square
      : {
          ...square,
          letter: undefined,
        }
  );

  const removedSquares = [...removedReversedSquares].reverse();

  const changedLevel = {
    ...currentLevel,
    squares: removedSquares,
  };

  const levels = gameState.levels.map((level, index) => {
    if (index !== gameState.currentLevelIndex) return level;
    return changedLevel;
  });

  return {
    ...gameState,
    levels,
  };
};

const addLetterToLevel = ({
  level,
  letter,
}: {
  level: Level;
  letter: Letter;
}): {
  level: Level;
  shouldGoToNextLevel: boolean;
} => {
  const currentSquareIndex = findEmptySquare({ level });

  const squares = addLetterToSquare({
    squares: level.squares,
    currentIndex: currentSquareIndex,
    letter,
  });

  const areSquaresFull = squares.every((square) => isSome(square.letter));

  // todo - check that word exists in dictionary

  const { changedLevel, shouldGoToNextLevel } = ifElse(areSquaresFull, {
    True: () => {
      const word = squares.reduce(
        (acc, square) =>
          handleOption(square.letter, {
            Some: (letter) => `${acc}${letter}`,
            None: () => {
              throw new Error("letter is not defined");
            },
          }),
        ""
      );

      const doesWordExist = checkWordExists(word);

      return ifElse(doesWordExist, {
        True: () => {
          console.log(`word ${word} does exist`);
          return {
            changedLevel: {
              ...level,
              squares,
            },
            shouldGoToNextLevel: true,
          };
        },
        False: () => {
          console.log(`word ${word} does not exist`);
          return {
            changedLevel: {
              ...level,
              squares,
            },
            shouldGoToNextLevel: false,
          };
        },
      });
    },
    False: () => {
      return {
        changedLevel: {
          ...level,
          squares,
        },
        shouldGoToNextLevel: false,
      };
    },
  });

  return {
    level: changedLevel,
    shouldGoToNextLevel,
  };
};

const Game = {
  buildInitialState,
  addLetter,
  removeLetter,
};

export default Game;
