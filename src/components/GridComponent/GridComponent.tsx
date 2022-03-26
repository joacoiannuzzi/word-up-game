import clsx from "clsx";
import { LevelComponent } from "components/LevelComponent/LevelComponent";
import { Level } from "game/types";
import { useGameStore } from "hooks/useGameState";
import { useEffect, useRef } from "react";

type GridComponentProps = {};

export const GridComponent = ({}: GridComponentProps) => {
  const { gameState } = useGameStore();
  const { levels, currentLevelIndex } = gameState;

  const currentLevelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    currentLevelRef?.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [levels]);

  return (
    <div
      className={clsx(
        "h-screen",
        "flex flex-col-reverse",
        "overflow-y-auto",
        "hide-scrollbar"
      )}
    >
      {levels.map((level) => (
        <div
          ref={
            level.id === (currentLevelIndex + 4).toString()
              ? currentLevelRef
              : null
          }
        >
          <LevelComponent key={level.id} level={level} />
        </div>
      ))}
    </div>
  );
};
