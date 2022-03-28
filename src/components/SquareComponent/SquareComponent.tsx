import clsx from "clsx";
import { BiUpArrow } from "react-icons/bi";
import { Square } from "game/types";
import { isPreviousUp } from "game/utils";
import { useGameStore } from "hooks/useGameState";
import { handleOption } from "lib/utils";

type SquareComponentProps = {
  square: Square;
};

export const SquareComponent = ({ square }: SquareComponentProps) => {
  const { gameState } = useGameStore();

  return (
    <div
      className={clsx(
        "w-20 h-20",
        "flex justify-center items-center",
        "border",
        "relative"
      )}
    >
      <div
        className={clsx("absolute", "opacity-25", "text-red-700")}
        style={{
          top: "5%",
          left: "5%",
        }}
      >
        {square.isUp && <BiUpArrow />}
      </div>
      <div
        className={clsx("capitalize text-2xl", {
          "text-teal-600": isPreviousUp({
            levels: gameState.levels,
            currentSquareId: square.id,
          }),
        })}
      >
        {handleOption(square.letter, {
          Some: (letter) => letter,
          None: () => "",
        })}
      </div>
    </div>
  );
};
