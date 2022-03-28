import clsx from "clsx";
import { LevelComponent } from "components/LevelComponent/LevelComponent";
import { useGameStore } from "hooks/useGameState";
import { useEffect, useRef } from "react";

export const GridComponent = () => {
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
        "h-3/4",
        "flex flex-col-reverse",
        "overflow-y-hidden",
        "hide-scrollbar"
      )}
    >
      {levels.map((level) => (
        <div
          key={level.id}
          ref={
            level.id === (currentLevelIndex + 4).toString()
              ? currentLevelRef
              : null
          }
        >
          <LevelComponent level={level} />
        </div>
      ))}
    </div>
  );
};
